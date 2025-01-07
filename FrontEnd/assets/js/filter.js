// Fonction  pour récupérer les catégories depuis l'API.
  export async function getCategories() {
   
   try { // Requête pour récupérer les catégories.
    const categories = await fetch("http://localhost:5678/api/categories");
    const categoriesJson = await categories.json();
    console.log(categoriesJson);

    const addCategories = { "id": 0,"name": "Tous"};
    categoriesJson.push(addCategories)
    // const newSet = new Set(categoriesJson);
    // newSet.add({ "id": 0,"name": "Tous"})
    // console.log(newSet);
    // return newSet;
    newCategories(categoriesJson)
    console.log("Données après ajout :", categoriesJson);
    
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
      const filterElement = document.createElement("p");
      filterElement.innerText = filter.name;
  
  
      // Ajout des balises enfants
      filterContainer.appendChild(filterElement); 
    }
  }
  

