// Appel de la fonction pour générer les filtres
getCategories();

// Fonction  pour récupérer les catégories depuis l'API.
export async function getCategories() {
  try {
    // Requête pour récupérer les catégories.
    const categories = await fetch("http://localhost:5678/api/categories");
    const categoriesJson = await categories.json();
    //Ajout filtre tous
    categoriesJson.unshift({ id: 0, name: "Tous" });

    newCategories(categoriesJson);
  } catch (error) {
    console.error(error.message);
  }
}

function newCategories(categories) {
  // Récupération de l'élément qui accueillera la galerie
  const filterContainer = document.querySelector(".filter-div");

  // Création des éléments HTML
  categories.forEach((filter) => {
    const filterElement = document.createElement("h2");
    filterElement.innerText = filter.name;
    filterElement.setAttribute("id", `${filter.id}`);
    filterElement.classList.add("filter-style");
    // Ajout de l'élément au container
    filterContainer.appendChild(filterElement);

    // Gestion du clic les élément du filtre
    filterElement.addEventListener("click", (event) => {
      const activeFilter = document.querySelector(".filter-active");
      activeFilter.classList.remove("filter-active");
      event.target.classList.add("filter-active");
    });
  });

  // Initialisation de la première catégorie comme active
  filterContainer.children[0].classList.add("filter-active");
}
