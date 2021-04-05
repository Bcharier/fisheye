import { Photographer } from "./photographer.js";
import { MediaList } from "./MediaList.js";
import { Media } from "./Media.js";

const urlParameters = new URLSearchParams(window.location.search);
const jsonData = "./Json/FishEyeDataFR.json";
let currentPhotographer = Photographer;
const mediaList = new MediaList();
let displayedMediaList = [];

/* 
Déclarations de constantes pour l"affichage de la bannière
*/

const photographerName = document.querySelector(".photographer-name");
const photographerCity = document.querySelector(".photographer-city");
const photographerTagline = document.querySelector(".photographer-tagline");
const photographerTags = document.querySelector(".photographer-tags");
const photographerPic = document.querySelector(".photographer-profile-pic");
const contactButton = document.querySelector(".contact-button");

/* 
Déclaration de constantes pour l"affichage du formulaire de contact
*/

const modalContainer = document.querySelector(".contact-modal-container");
const confirmationMessage = document.querySelector(".contact-modal-confirmation");
const contactForm = document.querySelector(".contact-modal-form");
const modalClose = document.querySelector(".contact-modal-close");
const modalValidateButton = document.querySelector(".contact-modal-validate");
const ModalTitle = document.querySelector(".contact-modal-title");

/* 
Récupération des données Json et création de la page
*/
function createPage() {
    fetch(jsonData)
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
        .then((data) => createPhotographer(data))
        .then(displayPage)
}



function createPhotographer(data) {
    data.photographers.forEach((photographer) => {
        if (photographer.id === Number(urlParameters.get("id")))
            currentPhotographer = new Photographer(
                photographer.name,
                photographer.id,
                photographer.city,
                photographer.country,
                photographer.tags,
                photographer.tagline,
                photographer.price,
                photographer.portrait
            )
    }
    )

    const mediaFactory = new Media()

    data.media.forEach((media) => {
        if (media.photographerId === currentPhotographer.id) {
            mediaList.addMedia(mediaFactory.createMedia(media.id, media.photographerId, media.image?.split(".").pop() || media.video?.split(".").pop(), media.image || media.video, media.tags, media.likes, media.date, media.price, media.alt, currentPhotographer.name.replace(" ", "") + "/"))
        }
    })
}

function displayPage() {
    document.title += " - " + currentPhotographer.name;

    displayBanner();
    displayMediaList();
    displayInfoBox()
}

/* Affichage de la bannière du photographe */

function displayBanner() {

    photographerName.textContent = currentPhotographer.name;
    photographerCity.textContent = currentPhotographer.city;
    photographerTagline.textContent = currentPhotographer.tagline;
    photographerPic.src = "./Images/Sample-Photos/Photographers ID Photos/" + currentPhotographer.portrait;

    currentPhotographer.tags.forEach((tag) => {
        const a = document.createElement("a")
        const span = document.createElement("span")
        a.classList.add("tag")
        a.href = "#"
        a.textContent = "#" + tag

        span.id = `${tag}`

        photographerTags.append(a)
        photographerTags.append(span)

    });

    contactButton.addEventListener("click", openContactModal);
}


/* 
Ouverture, fermeture et envoi du formulaire de contact
*/

function openContactModal() {

    modalContainer.style.display = "flex";
    ModalTitle.innerHTML += "Contactez-moi" + "</br>" + currentPhotographer.name;

    modalClose.addEventListener("click", closeContactModal);
    modalContainer.addEventListener("click", closeContactModal);
    modalValidateButton.addEventListener("submit", submitContactModal);

}

function closeContactModal(e) {
    modalContainer.style.display = "none";
    ModalTitle.innerHTML = "";
}

function submitContactModal(e) {
    console.log("click");
    e.preventDefault();
    contactForm.style.display = "none";
    confirmationMessage.style.display = "flex";
}

/* 
Affichage des médias des photographes
*/

function displayMediaList() {
    const sectionMediaList = document.querySelector(".media-list");
    const sort = document.querySelector(".custom-option.selected")?.getAttribute("data-value");
    const filters = [];

    sectionMediaList.innerHTML = ""
    document.querySelectorAll(".tag--selected").forEach((tagSelected) => {
        filters.push(tagSelected.textContent.replace("#", ""))
    })

    displayedMediaList = mediaList.getMediaList(sort, ...filters);

    displayedMediaList.forEach((media) => {

        if (typeof media !== "undefined") {
            const mediaContainer = document.createElement("section");
            const divMedia = document.createElement("div");
            const specificMediaElement = media.getDOMComponent();
            const mediaTitle = document.createElement("p");
            const mediaPrice = document.createElement("p");
            const mediaLikes = document.createElement("div");
            const textContainer = document.createElement("div");
            const linkToMedia = document.createElement("a");
            const likeIcon = document.createElement("i");
            const likeText = document.querySelector(".photographer-likes");

            mediaContainer.classList.add("media-container");
            divMedia.classList.add("div-media");
            linkToMedia.classList.add("link-image");
            mediaTitle.classList.add("media-title");
            mediaPrice.classList.add("media-price");
            mediaLikes.classList.add("media-likes");
            textContainer.classList.add("media-text-container");
            likeIcon.classList.add("far", "fa-heart");

            linkToMedia.href = "#"
            linkToMedia.addEventListener("click", (e) => e.preventDefault())
            linkToMedia.addEventListener("click", () => openMediaModal(media, displayedMediaList))

            mediaLikes.addEventListener("click", () => {
                if (likeIcon.classList.contains("fas")) {
                    removeLike();
                } else {
                    addLike();
                }
            })


            mediaTitle.textContent = media.title;
            mediaPrice.textContent = media.price + "€";
            mediaLikes.innerHTML = media.likes + " " + likeIcon.outerHTML;


            mediaContainer.append(divMedia);
            divMedia.append(specificMediaElement);
            linkToMedia.append(divMedia);
            textContainer.append(mediaTitle, mediaPrice, mediaLikes);
            mediaContainer.append(linkToMedia);
            mediaContainer.append(textContainer);
            sectionMediaList.append(mediaContainer);

            function addLike() {
                media.likes++;
                likeIcon.classList.remove("far");
                likeIcon.classList.add("fas");
                mediaLikes.innerHTML = media.likes + " " + likeIcon.outerHTML;
                likeText.textContent = mediaList.getLikes() + " " + "❤";
            }

            function removeLike() {
                media.likes--;
                likeIcon.classList.add("far");
                likeIcon.classList.remove("fas");
                mediaLikes.innerHTML = media.likes + " " + likeIcon.outerHTML;
                likeText.textContent = mediaList.getLikes() + " " + "❤";
            }
        }
    })
}


/* 
Afficher la boite d'information like/price du photographe
*/

function displayInfoBox() {
    const likeText = document.querySelector(".photographer-likes");
    const priceText = document.querySelector(".photographer-price");

    likeText.textContent = mediaList.getLikes() + " " + "❤";
    priceText.textContent = currentPhotographer.price + "€/jour";
}


/* 
Affichage des éléments médias dans la modale
*/

function openMediaModal (media, displayedMediaList) {
    const mediaModalContainer = document.querySelector(".media-modal-container");
    const mediaModal = document.querySelector('.media-modal');
    const mediaSection = mediaModal.querySelector('.media-modal-content');
    const mediaTitle = mediaModal.querySelector('.media-modal-content-title');
    const close = mediaModal.querySelector('.media-modal-close');
    const arrows = mediaModal.querySelectorAll('a.media-modal-arrow');
    const leftArrow = arrows[0];
    const rightArrow = arrows[1];
  
    let currentMedia = media;

    close.addEventListener('click', e => closeMediaModal(e, media));

    // mediaModal.addEventListener('click', e => closeMediaModal(e, media));

    mediaModal.firstElementChild.addEventListener('click', e => e.stopPropagation());
    rightArrow.addEventListener('click', e => nextMedia(e));
    leftArrow.addEventListener('click', e => previousMedia(e));
  
    showContent();
    
    mediaModalContainer.style.display= "block";
    mediaModal.style.display = 'flex';
    document.body.classList.add('disable-scroll');
  
    function nextMedia (e) {
      e.preventDefault();
      if ((displayedMediaList.indexOf(currentMedia) + 1) >= displayedMediaList.length) {
        currentMedia = displayedMediaList[0]
      } else {
        currentMedia = displayedMediaList[displayedMediaList.indexOf(currentMedia) + 1]
      }
      showContent();
    }
  
    function previousMedia (e) {
      e.preventDefault();
      if ((displayedMediaList.indexOf(currentMedia) - 1) < 0) {
        currentMedia = displayedMediaList[displayedMediaList.length - 1]
      } else {
        currentMedia = displayedMediaList[displayedMediaList.indexOf(currentMedia) - 1]
      }
      showContent();
    }
  
    function showContent () {
      mediaTitle.textContent = currentMedia.title
      mediaSection.firstChild.replaceWith(currentMedia.getDOMComponent(true))
    }
  }
  
  function closeMediaModal (e, media) {
    e.preventDefault();
    const mediaModalContainer = document.querySelector(".media-modal-container");
    const mediaModal = document.querySelector('.media-modal');
  
    mediaModalContainer.style.display ="none";
    mediaModal.style.display = 'none';
    document.body.classList.remove('disable-scroll');
  }


/* 
Création de la page 
 */

createPage();


