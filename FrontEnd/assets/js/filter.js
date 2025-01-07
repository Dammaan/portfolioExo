// Fonction  pour récupérer les catégories depuis l'API.
  export async function getCategories() {
   
   try { // Requête pour récupérer les catégories.
    const categories = await fetch("http://localhost:5678/api/categories");
    const categoriesJson = await categories.json();
    //Ajout filtre tous 
    categoriesJson.unshift ({ "id": 0,"name": "Tous"})
    
    newCategories(categoriesJson)

    
   }  catch (error) {
    console.error(error.message);
  }
}
    
    


  function newCategories(categories) {
    for (let i = 0; i < categories.length; i++) {
      const filter = categories[i];
  
      // Récupération de l'élément qui accueillera la galerie
      const filterContainer = document.querySelector(".filter-div");
  
      // Création des élèments html
      const filterElement = document.createElement("h2");
      filterElement.innerText = filter.name;
      filterElement.id = 'filter-style'

      filterContainer.appendChild(filterElement); 
    }
  }
  