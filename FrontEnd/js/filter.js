// Fonction  pour récupérer les catégories depuis l'API.
  export async function getCategories() {
    // Requête pour récupérer les catégories.
    const categories = await fetch("http://localhost:5678/api/categories");
    const categoriesJson = await categories.json();
    console.log(categoriesJson);
    return categoriesJson;
  }

  

