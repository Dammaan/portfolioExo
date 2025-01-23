import { generateGallery } from "./gallery.js";

let modal = null;

//Variables pour les modales
const target = document.getElementById("modal-edit");
const editModal = document.getElementById("edit-projects");
const addModal = document.getElementById("add-works");
const gallery = document.querySelector(".modal-gallery");

//Variables pour le formulaire
const editButton = document.querySelector("#edit-button");
const addButton = document.querySelector(".redirection-button");
const formImage = document.getElementById("previewImage");
const containerElements = document.querySelector(".AddPhoto");

// Fonction pour ouvrir la modale principale et afficher une sous-modale
const openModal = function (e) {
  e.preventDefault();

  if (!target) return;

  if (!editModal) {
    console.error("Impossible de trouver l'élément 'edit-projects'");
    return;
  }

  // Affiche la sous-modale "edit-projects"
  editModal.style.display = "block";

  // Affiche la modale principale
  target.style.display = "flex";
  target.setAttribute("aria-hidden", "false");
  target.setAttribute("aria-modal", "true");

  modal = target;

  generateGalleryModal();
};

// Fonction pour ouvrir la sous-modale "add-works"
const openModalAdd = function (e) {
  e.preventDefault();

  if (!addModal) {
    console.error("Impossible de trouver l'élément 'add-works'");
    return;
  }

  // Masquer 'edit-projects' et afficher 'add-works'
  if (editModal) {
    editModal.style.display = "none";
  }
  addModal.style.display = "block";
  addModal.setAttribute("aria-hidden", "false");
  addModal.setAttribute("aria-modal", "true");

  modal = addModal;

  // Bouton retour en arrière
  const returnButton = document.querySelector(".return-button");
  returnButton.addEventListener("click", returnBack);

  loadCategories();
};

// Fonction pour revenir à la modale précédente
function returnBack() {
  if (editModal) editModal.style.display = "block";
  if (addModal) addModal.style.display = "none";

  const form = document.getElementById("formAdd");
  if (form) form.reset();

  formImage.src = "#";
  formImage.style.display = "none";

  const containerElements = document.querySelector(".AddPhoto");
  if (containerElements) {
    containerElements.querySelector("i").style.display = "block";
    containerElements.querySelector("label").style.display = "block";
    containerElements.querySelector("p").style.display = "block";
  }

  generateGalleryModal();
}

// Fonction pour fermer la modale principale
const closeModal = function (e) {
  e.preventDefault();

  if (!target) return;

  // Masque la modale principale
  target.style.display = "none";
  target.setAttribute("aria-hidden", "true");
  target.setAttribute("aria-modal", "false");

  // Masquer les sous-modales
  if (editModal) editModal.style.display = "none";
  if (addModal) addModal.style.display = "none";

  modal = null;
};

// Ajout d'un événement global pour tous les boutons "close-button"
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-button")) {
    closeModal(e);
  }
});

// Attache les événements pour ouvrir les différentes modales
if (editButton) {
  editButton.addEventListener("click", openModal);
}

if (addButton) {
  addButton.addEventListener("click", openModalAdd);
}

// Fonction pour récupérer et générer la galerie
async function generateGalleryModal() {
  try {
    const api = await fetch("http://localhost:5678/api/works");
    if (!api.ok) {
      throw new Error(`Response status: ${api.status}`);
    }
    const works = await api.json();
    newElements(works);
  } catch (error) {
    console.error(error.message);
  }
}

function newElements(works) {
  if (!gallery) {
    console.error("Impossible de trouver l'élément '.modal-gallery'");
    return;
  }

  gallery.innerHTML = ""; // Vide la galerie avant d'ajouter de nouveaux éléments

  works.forEach((work) => {
    const figureElement = document.createElement("figure");
    figureElement.style.position = "relative";
    figureElement.setAttribute("data-id", work.id); // Ajoute l'ID du projet

    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;

    const iconeElement = document.createElement("i");
    iconeElement.classList.add("fa-solid", "fa-trash-can", "trash-icon");

    figureElement.appendChild(imageElement);
    figureElement.appendChild(iconeElement);

    gallery.appendChild(figureElement);
  });

  // Attache les événements de suppression après avoir ajouté les éléments à la galerie
  const trashIcons = document.querySelectorAll(".trash-icon");
  trashIcons.forEach((trashIcon) => {
    trashIcon.addEventListener("click", async function (e) {
      e.preventDefault();
      const figureElement = trashIcon.closest("figure"); // Récupère le parent figure
      const workId = figureElement.getAttribute("data-id");
      await deleteWork(workId); // Appel de deleteWork sans passer l'événement
    });
  });
}

// Charger les catégories depuis l'API et les afficher
async function loadCategories() {
  const categorySelect = document.getElementById("categoryInput");
  if (!categorySelect) {
    console.error("L'élément categoryInput n'a pas été trouvé.");
    return;
  }
  categorySelect.innerHTML = ""; // Vide les options existantes

  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    // Ajoute une option par défaut
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Choisissez une catégorie";
    categorySelect.appendChild(defaultOption);

    // Ajoute les catégories au sélecteur
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Erreur lors du chargement des catégories:", error);
  }
}

// Apparition de l'image chargée
document.getElementById("file").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    // Une fois le fichier chargé, mettre à jour l'aperçu
    reader.onload = function (e) {
      formImage.src = e.target.result;
      formImage.style.display = "block";

      // Masquer les éléments
      containerElements.querySelector("i").style.display = "none";
      containerElements.querySelector("label").style.display = "none";
      containerElements.querySelector("p").style.display = "none";
    };

    reader.readAsDataURL(file);
  } else {
    formImage.style.display = "none";
    formImage.src = "#";

    // Réafficher les éléments
    containerElements.querySelector("i").style.display = "block";
    containerElements.querySelector("label").style.display = "block";
    containerElements.querySelector("p").style.display = "block";
  }
});

document.querySelector(".add-button").addEventListener("click", addWork);

// Validation et soumission du formulaire d'ajout de travail
async function addWork(e) {
  e.preventDefault();

  const form = document.getElementById("formAdd");
  if (!form) {
    console.error("Le formulaire d'ajout de travail n'a pas été trouvé.");
    return;
  }

  const formData = new FormData(form);

  // Validation des champs obligatoires
  if (
    !formData.get("title") ||
    !formData.get("category") ||
    !formData.get("image")
  ) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    returnBack(e);
    generateGallery();
  } catch (error) {
    console.error("Erreur lors de l'ajout du projet:", error);
  }
}

// Fonction pour supprimer un projet
async function deleteWork(workId) {
  if (!confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
    return;
  }

  try {
    // Envoie une requête DELETE à l'API
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok)
      throw new Error(`Erreur lors de la suppression: ${response.status}`);

    // Supprime l'élément de la galerie
    const figureElement = document.querySelector(`figure[data-id="${workId}"]`);
    if (figureElement) {
      figureElement.remove();
    }
    generateGallery();
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
  }
}
