// Importez les styles, les données et les modules nécessaires
import "../../style.css";
import { dataRecipes } from "../../data/recipes";
import { RecipeManager } from "../models/RecipeManager";
import { toggleButtonFilter } from "../utils/displayButtonFilter";
import { totalRecipeUpdate } from "../utils/totalRecipeUpdate";
import { dropdownFilter } from "../utils/dropdownFilter";
import { filterList, mainSearch } from "../utils/filterList";

// Sélectionnez les éléments DOM principaux
const inputSearch = document.getElementById("search");
const ingredientsFilterButton = document.getElementById("ingredients");
const applianceFilterButton = document.getElementById("appliance");
const ustensilsFilterButton = document.getElementById("ustensils");
const recipeCardZone = document.getElementById("recipeCardZone");

// Créez une instance de RecipeManager
let recipes = new RecipeManager(dataRecipes);

// Ajoutez des écouteurs d'événements pour les boutons de filtre
ingredientsFilterButton.addEventListener("click", () => {
  toggleButtonFilter("ingredient");
});
applianceFilterButton.addEventListener("click", () => {
  toggleButtonFilter("appliance");
});
ustensilsFilterButton.addEventListener("click", () => {
  toggleButtonFilter("ustensils");
});

// Créez et affichez les cartes de recette initiales
recipeCardZone.innerHTML = "";
let recipeCards = recipes.createRecipeCards();
recipeCards.forEach((recipeCard) => {
  recipeCardZone.appendChild(recipeCard);
});

// Mettez à jour le total des recettes
totalRecipeUpdate(recipeCards);

// Ajoutez un écouteur d'événements pour la recherche par mot-clé
inputSearch.addEventListener("keydown", (event) => {
  const valueInput = event.target.value;
  if (event.key === "Enter" && valueInput.length >= 3) {
    event.preventDefault();
    event.target.value = ''
    const valeurActuelle = valueInput.trim();
    if (valeurActuelle !== "") {
      // Filtrer les recettes en fonction du mot-clé saisi
      recipes = new RecipeManager(dataRecipes);
      const searchFilter = recipes.recipeFilter(valeurActuelle);

      mainSearch.splice(0, mainSearch.length)
      mainSearch.push(searchFilter)

      // Mettre à jour les recettes en fonction des filtres sélectionnés
      recipes = new RecipeManager(searchFilter);
      recipeCards = recipes.createRecipeCards();
      recipeCardZone.innerHTML = ''; // Afficher les filtres déroulants
      recipeCards.forEach((recipeCard) => {
        recipeCardZone.appendChild(recipeCard);
      });

      dropdownFilter(searchFilter);
      totalRecipeUpdate(searchFilter)
    }
  }
});

// Affichez les filtres déroulants initiaux
dropdownFilter(recipes.recipeList);
mainSearch.push(recipes)
