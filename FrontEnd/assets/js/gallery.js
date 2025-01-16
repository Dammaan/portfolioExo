// Fonction pour récupérer et générer la galerie
export async function generateGallery() {
  try {
    // Récupération des données via l'API
    const api = await fetch("http://localhost:5678/api/works");
    if (!api.ok) {
      throw new Error(`Response status: ${api.status}`);
    }
    const works = await api.json();

    //Génération des elements de la galerie intiale
    gallerySort(works);

    //Génération des elements de la galerie au click
    const clickBtn = document.querySelector(".filter-div")
    clickBtn.addEventListener("click", () => {
      gallerySort(works)
    });

    modeEdition()
    deconnexion()

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


// Ajouter la bannière si l'utilisateur est connecté
function modeEdition() {
  const body = document.querySelector('body');

  // Vérification si l'utilisateur est déjà connecté puis création de l'interface edition
  if (localStorage.getItem("token")) {
    
    const banner = document.createElement("div");
    banner.classList.add("edition-banner");

    const iconBanner = document.createElement("i");
    iconBanner.classList.add("fa-regular", "fa-pen-to-square");

    const txtBanner = document.createElement("p");
    txtBanner.innerText = "Mode édition";

    body.insertBefore(banner,body.firstChild);
    banner.appendChild(iconBanner);
    banner.appendChild(txtBanner);

    const logOut = document.getElementById("login-logout")
    logOut.innerText ="logout";
    logOut.setAttribute("href","#");

    // Ajout bouton modal 

    const editWorks =document.getElementById ("edit-works")
    editWorks.style.display = "flex"


    // Supression filtres 
    const filterDiv = document.querySelector(".filter-div")
    filterDiv.innerHTML=""
    
  }
}

// Fonction pour déconnecter l'utilisateur et enlever la bannière
function deconnexion() {
  const logOut = document.getElementById("login-logout")
  // Suprime le token et replace interface en mode normal à l'evenement
  logOut.addEventListener("click",(event) => {
    localStorage.removeItem("token") 
    logOut.innerHTML = "";
    window.location.href = "./index.html"; // Rediriger après déconnexion
});

    
  }; 
  
//Ouverture modal

let modal = null;

const openModal = function (e) {
  e.preventDefault();
  const target = document.getElementById("modal-edit");
  target.style.display = "flex";
  target.setAttribute("aria-hidden", false);
  target.setAttribute("aria-modal", true);
  modal = target;
};


const editButton = document.querySelector("#edit-button")
if(editButton) {
  editButton.addEventListener("click", openModal);
}

  


