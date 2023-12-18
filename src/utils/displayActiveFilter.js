import { dataRecipes } from "../../data/recipes";
import { ModelRecipe } from "../models/ModelRecipe";
import { ingredientList, applianceList, ustensilsList } from "./filterList";

const recipeInstances = dataRecipes.map(
  (recipeData) => new ModelRecipe(recipeData)
);

// Affiche le tableau de tous les filtres dans une div
export function displayActiveFilter(data) {
  const filterSpecificationZone = document.getElementById("filterSpecificationZone");
  filterSpecificationZone.innerText = "";

  // Si data est un tableau, traite-le comme avant
  data.forEach((element) => {
    const elementBloc = document.createElement("p");
    elementBloc.innerHTML = `${element} <i class="cross cursor-pointer fa-solid fa-xmark"></i>`;
    elementBloc.setAttribute(
      "class",
      "flex justify-between items-center h-14 w-52 mt-7 p-4 font-medium rounded-lg bg-amber-300 filterData"
    );

    // Nouvelle logique pour comparer avec le fichier JSON de recettes
    const matchType = findMatchType(element);
    console.log(`Correspondance pour ${element} : ${matchType}`);

    filterSpecificationZone.appendChild(elementBloc);
    console.log(element)
  });
  
  // Reourne le type de l'élément
  function findMatchType(element) {
    const normalizedElement = element.toLowerCase();
    for (const recipe of recipeInstances) {
      // Vérifie les ingrédients
      for (const ingredient of recipe.ingredients) {
        if (ingredient.ingredient.toLowerCase() === normalizedElement) {
          ingredientList.push(element);
          return 'Ingredient';
        }
      }
      // Vérifie l'appareil
      if (recipe.appliance.toLowerCase() === normalizedElement) {
        applianceList.push(element);
        return 'Appliance';
      }

      // Vérifie les ustensiles
      for (const ustensil of recipe.ustensils) {
        if (ustensil.toLowerCase() === normalizedElement) {
          ustensilsList.push(element);
          return 'Ustensil';
        }
      }
    }

    // Aucune correspondance trouvée
    return 'Aucune correspondance';}
}
