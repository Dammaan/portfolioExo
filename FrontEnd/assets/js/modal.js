// Ouverture modale
let modal = null;

const openModal = function (e) {
  e.preventDefault();
  const target = document.getElementById("modal-edit"); // Modale cible
  if (!target) return;

  target.style.display = "flex";
  target.setAttribute("aria-hidden", "false");
  target.setAttribute("aria-modal", "true");
  modal = target;
  
  generateGallery()

  // Ajout de l'événement au bouton de fermeture
  const closeButton = modal.querySelector(".close-button");
  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }
};
 
// Fermeture modale
const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();

  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-modal", "false");

  // Nettoyage des événements
  const closeButton = modal.querySelector(".close-button");
  if (closeButton) {
    closeButton.removeEventListener("click", closeModal);
  }
  modal = null;
};

// Attache l'événement au bouton d'ouverture
const editButton = document.querySelector("#edit-button");
if (editButton) {
  editButton.addEventListener("click", openModal);
}


// Fonction pour récupérer et générer la galerie
async function generateGallery() {
  try {
    // Récupération des données via l'API
    const api = await fetch("http://localhost:5678/api/works");
    if (!api.ok) {
      throw new Error(`Response status: ${api.status}`);
    }
    const works = await api.json();

    //Génération des elements de la galerie intiale
    newElements(works);

      } catch (error) {
    console.error(error.message);
  }
}


function newElements(works) {
  // Sélection de la galerie
  const gallery = document.querySelector(".modal-gallery");
  if (!gallery) {
    console.error("Impossible de trouver l'élément '.modal-gallery'");
    return;
  }

  // Vider la galerie avant de générer de nouveaux éléments
  gallery.innerHTML = "";

  // Création et ajout des éléments à la galerie
  works.forEach((work) => {
    // Création de l'image
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;

    // Création de l'icone
    const iconeElement = document.createElement("i");
    iconeElement.classList.add("fa-solid", "fa-trash-can");

    // Ajout des éléments enfants à <figure>
    gallery.appendChild(iconeElement);
    imageElement.appendChild(iconeElement);

    // Ajout de <figure> à la galerie
    gallery.appendChild(imageElement);
  });
}

