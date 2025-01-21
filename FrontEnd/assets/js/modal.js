let modal = null;

// Fonction pour ouvrir la modale principale et afficher une sous-modale
const openModal = function (e) {
  e.preventDefault();

  const target = document.getElementById("modal-edit");
  if (!target) return;

  const editModal = document.getElementById("edit-projects");
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

  generateGallery();
};

// Fonction pour ouvrir la sous-modale "add-works"
const openModalAdd = function (e) {
  e.preventDefault();

  const editModal = document.getElementById("edit-projects");
  const newModal = document.getElementById("add-works");

  if (!newModal) {
    console.error("Impossible de trouver l'élément 'add-works'");
    return;
  }

  // Masquer 'edit-projects' et afficher 'add-works'
  if (editModal) {
    editModal.style.display = "none";
  }
  newModal.style.display = "flex";
  newModal.setAttribute("aria-hidden", "false");
  newModal.setAttribute("aria-modal", "true");

  modal = newModal;

  loadCategories();
};

// Fonction pour fermer la modale principale
const closeModal = function (e) {
  e.preventDefault();

  const target = document.getElementById("modal-edit");
  if (!target) return;

  // Masque la modale principale
  target.style.display = "none";
  target.setAttribute("aria-hidden", "true");
  target.setAttribute("aria-modal", "false");

  // Masquer les sous-modales
  const editModal = document.getElementById("edit-projects");
  const addModal = document.getElementById("add-works");
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

// Attache les événements pour ouvrir les differentes modales
const editButton = document.querySelector("#edit-button");
if (editButton) {
  editButton.addEventListener("click", openModal);
}

const addButton = document.querySelector(".redirection-button");
if (addButton) {
  addButton.addEventListener("click", openModalAdd);
}

// Fonction pour récupérer et générer la galerie
async function generateGallery() {
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
  const gallery = document.querySelector(".modal-gallery");
  if (!gallery) {
    console.error("Impossible de trouver l'élément '.modal-gallery'");
    return;
  }

  gallery.innerHTML = ""; // Vide la galerie avant d'ajouter de nouveaux éléments

  works.forEach((work) => {
    const figureElement = document.createElement("figure");
    figureElement.style.position = "relative"; // Pour positionner l'icône correctement

    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;

    const iconeElement = document.createElement("i");
    iconeElement.classList.add("fa-solid", "fa-trash-can", "trash-icon");

    figureElement.appendChild(imageElement);
    figureElement.appendChild(iconeElement);

    gallery.appendChild(figureElement);
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
  const file = event.target.files[0]; // Récupère le fichier sélectionné
  const previewImage = document.getElementById("previewImage");
  const containerElements = document.querySelector(".containerAddPhoto");

  if (file) {
    const reader = new FileReader();

    // Une fois le fichier chargé, mettre à jour l'aperçu
    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.style.display = "block"; // Affiche l'image

      // Masquer les éléments
      containerElements.querySelector("i").style.display = "none";
      containerElements.querySelector("label").style.display = "none";
      containerElements.querySelector("p").style.display = "none";
    };

    reader.readAsDataURL(file); // Lit le fichier en tant que Data URL
  } else {
    previewImage.style.display = "none"; // Cache l'aperçu si aucun fichier n'est sélectionné
    previewImage.src = "#";

    // Réafficher les éléments
    containerElements.querySelector("i").style.display = "block";
    containerElements.querySelector("label").style.display = "block";
    containerElements.querySelector("p").style.display = "block";
  }
});
