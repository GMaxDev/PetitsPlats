import "../../style.css";
import { dataRecipes } from "../../data/recipes";
import { ModelRecipe } from "../models/ModelRecipe";
import { createRecipeCard } from "../utils/createRecipeCard";

const recipeInstances = dataRecipes.map(
  (recipeData) => new ModelRecipe(recipeData)
);

function totalRecipeUpdate(data) {
  const totalRecipe = document.getElementById("totalRecipe");
  totalRecipe.innerHTML = `${data.length} recettes`;
}

createRecipeCard(recipeInstances);
totalRecipeUpdate(recipeInstances);
