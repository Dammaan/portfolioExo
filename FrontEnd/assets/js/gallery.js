// Fonction pour récupérer et générer la galerie
export async function generateGallery() {
  try {
    // Récupération des données via l'API
    const api = await fetch("http://localhost:5678/api/works");
    if (!api.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const works = await api.json();

    //Génération des elements de la galerie intiale
    gallerySort(works);

    //Génération des elements de la galerie au click
    const clickBtn = document.querySelector(".filter-div")
    clickBtn.addEventListener("click", () => {
      gallerySort(works)
    });
  } catch (error) {
    console.error(error.message);
  }
}


// Création de la galerie selon sont filtre
function gallerySort(works) {
  const filterBtn = document.querySelector(".filter-active");

  const idFilter = filterBtn.id; 

  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  // Tout afficher filter "tous"
  if (idFilter === "0") {
      newElements(works, gallery);

    // Afficher selon id de la categorie != "tous" 
    } else {
        const filteredWorks = works.filter(work => work.categoryId == idFilter);        
        newElements(filteredWorks, gallery);
      }
} 


function newElements (works, gallery) {
  for (let i = 0; i < works.length; i++) {
        const work = works[i];

        // Création des éléments HTML
        const figureElement = document.createElement("figure");
        figureElement.id = work.id;

        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;

        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = work.title;

        // Ajout des éléments enfants
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
        gallery.appendChild(figureElement);
      }
}



