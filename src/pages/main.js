import "../../style.css";
import { dataRecipes } from "../../data/recipes";
import { ModelRecipe } from "../models/ModelRecipe";

let recipeCardZone = document.getElementById("recipeCardZone");
const recipeInstances = dataRecipes.map(
  (recipeData) => new ModelRecipe(recipeData)
);

function createRecipeCard(recipeInstances) {
  recipeInstances.forEach((recipeInstance) => {
    const recipeCard = document.createElement("div");
    const recipeZone = document.createElement("div");
    const ingredientZone = document.createElement("div");
    const h3 = document.createElement("h4");
    const h4Recipe = document.createElement("h4");
    const h4Ingredients = document.createElement("h4");
    const ingredientName = document.createElement("h5");
    const p = document.createElement("p");
    const img = document.createElement("img");

    // const cheminImage = `assets/img/`;

    recipeCard.setAttribute("class", "h-full bg-white rounded-3xl");
    recipeZone.setAttribute("class", "mt-6 mb-14 mx-6");

    img.src = `../../assets/img/${recipeInstance.image}`;
    img.setAttribute("class", "w-full h-64 object-cover rounded-t-3xl");

    h3.innerHTML = recipeInstance.name;
    h3.setAttribute("class", "font-bold text-lg mb-7");

    h4Recipe.innerHTML = "Recette";
    h4Recipe.setAttribute("class", "mb-3.5");

    p.innerHTML = recipeInstance.description;
    p.setAttribute("class", "mb-8");

    h4Ingredients.innerHTML = "Ingrédients";
    h4Ingredients.setAttribute("class", "mb-4");

    // -----------------------------------------------

    recipeCardZone.appendChild(recipeCard);

    recipeCard.appendChild(img);
    recipeCard.appendChild(recipeZone);

    recipeZone.appendChild(h3);
    recipeZone.appendChild(h4Recipe);
    recipeZone.appendChild(p);
    recipeZone.appendChild(h4Ingredients);
    recipeZone.appendChild(ingredientZone);

    if (recipeInstance.ingredients) {
      recipeInstance.ingredients.forEach((ingredient) => {
        ingredientName.innerHTML = ingredient.name;
      });
    }
  });
}

createRecipeCard(recipeInstances);
