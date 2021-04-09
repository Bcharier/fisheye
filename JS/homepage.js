import { Photographer } from "./photographer.js";
import { PhotographerList } from "./PhotographerList.js";

const jsonData = "./Json/FishEyeDataFR.json"
const photographerList = new PhotographerList();

/* 
Récupération des données Json et affichage des éléments de la page
*/

function createPage() {
  fetch(jsonData)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
    })
    .then((data) => createPhotographers(data))
    .then(displayPage)
}

function displayPage() {
  displayTags();
  displayPhotographers();
}


/* 
Récupération des données de chaque photographe
*/

function createPhotographers(data) {
  data.photographers.forEach((photographer) => {
    photographerList.addPhotographer(new Photographer(
      photographer.name,
      photographer.id,
      photographer.city,
      photographer.country,
      photographer.tags,
      photographer.tagline,
      photographer.price,
      photographer.portrait
    ))
  })
}

/* 
Affichage des tags permettant de trier les photographes
*/

function displayTags () {
  const tagList = document.querySelector(".nav-tags");

  photographerList.getTags().forEach((tag) => {
    const tagLink = document.createElement("a");
    tagLink.classList.add("tag");
    tagLink.href = "#";
    tagLink.textContent = "#" + tag;
    tagLink.setAttribute("aria-labelledby", `${tag}`);

    tagList.append(tagLink);

    
    tagLink.addEventListener("click", (e) => {
      e.preventDefault();
      tagLink.classList.toggle("tag-selected");
      displayPhotographers();
    })
  })
}


/* 
Affichage des éléments de présentation de chaque photographe
*/


function displayPhotographers() {
  const mainHome = document.querySelector("#main-home");
  const filters = [];

  mainHome.innerHTML = ''

  document.querySelectorAll(".tag-selected").forEach((tagSelected) => {
    filters.push(tagSelected.textContent.replace("#", ""))
  })


  photographerList.getPhotographerList(...filters).forEach((photographer) => {
    const photographerLinkToPage = "photographer.html?id=" + photographer.id;
    const photographerLinkToPhoto = "./Images/Sample-Photos/Photographers_ID_Photos/" + photographer.portrait;
    const photographerSection = document.createElement("section");
    const photographerLink = document.createElement("a");
    const photographerPortrait = document.createElement("img");
    const photographerName = document.createElement("div");
    const photographerLocation = document.createElement("div");
    const photographerTagline = document.createElement("div");
    const photographerPrice = document.createElement("div");
    const photographerTags = document.createElement("div");

    photographerLink.href = photographerLinkToPage;
    photographerPortrait.src = photographerLinkToPhoto;
    photographerPortrait.alt = "Portrait de " + photographer.name;
    photographerName.textContent = photographer.name;
    photographerLocation.textContent = photographer.city + "," + " " + photographer.country;
    photographerTagline.textContent = photographer.tagline;
    photographerPrice.textContent = photographer.price + " €/jour";

    photographerLink.append(photographerPortrait, photographerName);
    photographerSection.append(photographerLink, photographerLocation, photographerTagline, photographerPrice, photographerTags);


    photographerSection.classList.add("photographer-profile");
    photographerLink.classList.add("photographer-link");
    photographerPortrait.classList.add("photographer-portrait");
    photographerName.classList.add("photographer-name");
    photographerLocation.classList.add("photographer-location");
    photographerTagline.classList.add("photographer-tagline");
    photographerPrice.classList.add("photographer-price");
    photographerTags.classList.add("photographer-tags");

    photographer.tags.forEach((tag) => {
      const tagLink = document.createElement("a");

      tagLink.textContent = "#" + tag;
      tagLink.href = "#";
      photographerTags.append(tagLink);
      tagLink.setAttribute("aria-labelledby", `${tag}`);

      tagLink.href = photographerLinkToPage + "&tag=" + tag;

      tagLink.classList.add("tag");
    })

    mainHome.append(photographerSection);
  }
  )
}


createPage();