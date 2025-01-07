// Fonction pour récupérer et générer la galerie
export async function generateGallery() {
  try {
    // Récupération des données via l'API
    const api = await fetch("http://localhost:5678/api/works");
    if (!api.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const works = await api.json();

    //Génération des elements de la galerie
    newElement(works);
    
  } catch (error) {
    console.error(error.message);
  }
}


// Création de la galerie
function newElement(works) {
  for (let i = 0; i < works.length; i++) {
    const work = works[i];

    // Récupération de l'élément qui accueillera la galerie
    const gallery = document.querySelector(".gallery");

    // Création des élèments html
    const figureElement = document.createElement("figure");
    figureElement.id = work.id;

    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;

    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = work.title;

    // Ajout des balises enfnats
    figureElement.appendChild(imageElement);
    figureElement.appendChild(figcaptionElement);
    gallery.appendChild(figureElement); 
  }
}



