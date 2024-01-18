// Importez les styles, les données et les modules nécessaires
import "../../style.css";
import { dataRecipes } from "../../data/recipes";
import { RecipeManager } from "../models/RecipeManager";
import { toggleButtonFilter } from "../utils/displayButtonFilter";
import { totalRecipeUpdate } from "../utils/totalRecipeUpdate";
import {
  dropdownFilter,
  handleFilterItemClick,
} from "../utils/dropdownFilter";
import { mainSearch, ingredientList, applianceList, ustensilList } from "../utils/filterList";

// Sélectionnez les éléments DOM principaux
const inputSearch = document.getElementById("search");
const ingredientsFilterButton = document.getElementById("ingredients");
const applianceFilterButton = document.getElementById("appliance");
const ustensilsFilterButton = document.getElementById("ustensils");
const recipeCardZone = document.getElementById("recipeCardZone");

const dropdownIngredients = document.getElementById("ingredientList");
const dropdownAppliance = document.getElementById("applianceList");
const dropdownUstensils = document.getElementById("ustensilList");

// Créez une instance de RecipeManager
let baseRecipes = new RecipeManager(dataRecipes);
let recipes = new RecipeManager(dataRecipes);

// Ajoutez des écouteurs d'événements pour les boutons de filtre
ingredientsFilterButton.addEventListener("click", () => {
  toggleButtonFilter("ingredient");
});
applianceFilterButton.addEventListener("click", () => {
  toggleButtonFilter("appliance");
});
ustensilsFilterButton.addEventListener("click", () => {
  toggleButtonFilter("ustensil");
});

// Créez et affichez les cartes de recette initiales
recipeCardZone.innerHTML = "";
console.log(recipes.recipeList);

let recipeCards = recipes.createRecipeCards();
recipeCards.forEach((recipeCard) => {
  recipeCardZone.appendChild(recipeCard);
});

// Mettez à jour le total des recettes
totalRecipeUpdate(recipeCards);

// Ajoutez un écouteur d'événements pour la recherche par mot-clé
inputSearch.addEventListener("input", (event) => {
  const valueInput = event.target.value;
  if (valueInput.length >= 3) {
    // event.preventDefault();
    const valeurActuelle = valueInput.trim();
    if (valeurActuelle !== "") {
      ingredientList.splice(0, ingredientList.length)
      applianceList.splice(0, applianceList.length)
      ustensilList.splice(0, ustensilList.length)

      // Filtrer les recettes en fonction du mot-clé saisi
      const recipeList = recipes.recipeFilter(valeurActuelle);

      mainSearch.current = valeurActuelle

      // Mettre à jour les recettes en fonction des filtres sélectionnés
      recipeCards = recipes.createRecipeCards();
      recipeCardZone.innerHTML = ""; // Afficher les filtres déroulants
      recipeCards.forEach((recipeCard) => {
        recipeCardZone.appendChild(recipeCard);
      });
      dropdownFilter(recipeList);
      totalRecipeUpdate(recipeList);
      document.getElementById('filterSpecificationZone').innerText = ''
    }
  } else if (valueInput.length < 3){
    let baseRecipeCards = baseRecipes.createRecipeCards()
    recipeCardZone.innerHTML = "";
    baseRecipeCards.forEach((recipeCard) => {
      recipeCardZone.appendChild(recipeCard);
    });
    totalRecipeUpdate(dataRecipes);
  }
});

// Affichez les filtres déroulants initiaux
dropdownFilter(recipes.recipeList);

export function handleDropdownOptionClick(event) {
  handleFilterItemClick(event);
  const recipeList = recipes.recipeFilter(mainSearch.current);
  recipeCards = recipes.createRecipeCards();
  recipeCardZone.innerHTML = ""; // Afficher les filtres déroulants
  recipeCards.forEach((recipeCard) => {
    recipeCardZone.appendChild(recipeCard);
  });
  dropdownFilter(recipeList);
  totalRecipeUpdate(recipeList);
}

dropdownIngredients.addEventListener("click", handleDropdownOptionClick);
dropdownAppliance.addEventListener("click", handleDropdownOptionClick);
dropdownUstensils.addEventListener("click", handleDropdownOptionClick);