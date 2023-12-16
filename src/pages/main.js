import "../../style.css";
import { dataRecipes } from "../../data/recipes";
import { RecipeManager } from "../models/RecipeManager";
import { toggleButtonFilter } from "../utils/displayButtonFilter";
import { totalRecipeUpdate } from "../utils/totalRecipeUpdate";
import { dropdownFilter } from "../utils/dropdownFilter";

const inputSearch = document.getElementById("search");

let recipes = new RecipeManager(dataRecipes);

const ingredientsFilterButton = document.getElementById("ingredients");
ingredientsFilterButton.addEventListener("click", () => {
  toggleButtonFilter("ingredient");
});
const applianceFilterButton = document.getElementById("appliance");
applianceFilterButton.addEventListener("click", () => {
  toggleButtonFilter("appliance");
});
const ustensilsFilterButton = document.getElementById("ustensils");
ustensilsFilterButton.addEventListener("click", () => {
  toggleButtonFilter("ustensils");
});

// ---------------------------------------------------

const recipeCardZone = document.getElementById("recipeCardZone");
recipeCardZone.innerHTML = "";
let recipeCards = recipes.createRecipeCards();
recipeCards.forEach((recipeCard) => {
  recipeCardZone.appendChild(recipeCard);
});

// ---------------------------------------------------

totalRecipeUpdate(recipeCards);

inputSearch.addEventListener("keydown", (event) => {
  const valueInput = event.target.value;
  if (event.key === "Enter" && valueInput.length >= 3) {
    event.preventDefault();
    const valeurActuelle = valueInput.trim(); //Supprime les espaces en début et fin de chaine
    if (valeurActuelle !== "") {
      const searchFilter = recipes.recipeFilter(valeurActuelle);
      recipeCardZone.innerHTML = ''

      console.log("toto");
      dropdownFilter(searchFilter);

      recipes = new RecipeManager(searchFilter);
      recipeCards = recipes.createRecipeCards();
      recipeCards.forEach((recipeCard) => {
        recipeCardZone.appendChild(recipeCard);
      });
      console.log(searchFilter);
    }
  }
});

dropdownFilter(recipes.recipeList);
console.log(recipes.recipeList);