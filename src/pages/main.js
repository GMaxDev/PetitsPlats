import "../../style.css";
import { dataRecipes } from "../../data/recipes";
import { ModelRecipe } from "../models/ModelRecipe";
import { createRecipeCard } from "../utils/createRecipeCard";
import { totalRecipeUpdate } from "../utils/totalRecipeUpdate";
import { displayActiveFilter } from "../utils/displayActiveFilter";

const inputSearch = document.getElementById("search");
const recipeInstances = dataRecipes.map(
  (recipeData) => new ModelRecipe(recipeData)
);
let filterList = [];

createRecipeCard(recipeInstances);
totalRecipeUpdate(recipeInstances);

inputSearch.addEventListener("input", (event) => {
  const valueInput = event.target.value;
  const recipeCards = document.getElementsByClassName("recipeCard");
  let totalMatchRecipe = 0;

  for (let i = 0; i < recipeInstances.length; i++) {
    const currentRecipeCard = recipeCards[i];
    const textContent = currentRecipeCard.id.toLowerCase();

    if (!textContent.includes(valueInput.toLowerCase())) {
      recipeCards[i].style.display = "none";
    } else {
      recipeCards[i].style.display = "block";
      totalMatchRecipe++;
    }
  }
  totalRecipeUpdate(totalMatchRecipe);
});

inputSearch.addEventListener("keydown", (event) => {
  const valueInput = event.target.value;
  if (event.key === "Enter") {
    event.preventDefault();

    const valeurActuelle = valueInput.trim();
    if (valeurActuelle !== "") {
      filterList.push(valeurActuelle);
    }

    displayActiveFilter(filterList);
    inputSearch.value = "";
    console.log(filterList)
  }
});

function dropdownFilter(data){
  const dropdownIngredients = document.getElementById("ingredientList")
  const dropdownAppliance = document.getElementById("applianceList")
  const dropdownUstensils = document.getElementById("ustensilsList")

  data.forEach(element => {
    element.ingredients.forEach(ingredient => {
      const ingredientitemLi = document.createElement("li")
      ingredientitemLi.innerHTML = ingredient.ingredient
      ingredientitemLi.setAttribute("class", "pl-4 py-2 cursor-pointer")
      dropdownIngredients.append(ingredientitemLi)
    })

    const applianceitemLi = document.createElement("li")

    element.ustensils.forEach(ustensil => {
      const ustensilsitemLi = document.createElement("li")
    })

  });
}

dropdownFilter(recipeInstances)