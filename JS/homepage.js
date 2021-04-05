import { Photographer } from "./photographer.js";


const jsonData = "./Json/FishEyeDataFR.json"

let dataPhotographers = [];
let dataMedia = [];
// retrieving JSON Data
const retrieveJsonData = function(jsonData){
fetch(jsonData)
  .then((response) => response.json())
  .then((data) => {
    dataPhotographers = data.photographers;
    browsePhotographers(dataPhotographers);
    dataMedia = data.media;
  })
}
retrieveJsonData(jsonData);

// function createPage() {
//   fetch(jsonData)
//       .then((response) => {
//           if (response.ok) {
//               return response.json()
//           }
//       })
//       .then((data) => createPhotographer(data))
//       .then(displayPage)
// }


// For each photographer apply function
const browsePhotographers = function (photographers){
  photographers.forEach(photographer =>
    generatePhotographHtml(photographer));
}

// Apply HTML function for found photographers
const generatePhotographHtml = function (photographer){
  const newElement = document.createElement('div');
  const containerPhotographers = document.getElementById('photographers');
  containerPhotographers.appendChild(newElement);
  newElement.classList.add('photographer-profile');
  newElement.innerHTML = `         
  <div class="photographer">
    <a aria-label="visit profile" href="photographer.html?id=${photographer.id}">
      <img class="photographer-thumbnail" title="${photographer.name}"  src="Images/Sample-Photos/Photographers ID Photos/${photographer.portrait}" alt="">
      <h2 class="photographer-name">${photographer.name}</h2>
    </a>
  </div>
  <div class="photographer-info">
    <p class="photographer-location">${photographer.city}, ${photographer.country}</p>
    <p class="photographer-description">${photographer.tagline}</p>
    <p class="photographer-price">${photographer.price}€/jour</p>
  </div>
  <div class="photographer-tag" >
    <ul id="${photographer.id}">
    </ul>
  </div>`;

    // in earch HTML div create hashtag(s)
    const hashtag = photographer.tags.forEach((tag) => {
        const li = document.createElement('li');
        const id = photographer.id;
        const container = document.getElementById(id);
        container.appendChild(li);
        li.innerHTML = `<button class="tag" title="${tag}" href="">#${tag}</button>`;
      }); 
    }

    // createPage();