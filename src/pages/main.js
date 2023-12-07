import "../../style.css";
import { dataRecipes } from "../../data/recipes";
import { ModelRecipe } from "../models/ModelRecipe";
import { createRecipeCard } from "../utils/createRecipeCard";
import { totalRecipeUpdate } from "../utils/totalRecipeUpdate";

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
  }
});

function displayActiveFilter(array) {
  const filterSpecificationZone = document.getElementById("filterSpecificationZone");
  filterSpecificationZone.innerText = ''

  array.forEach((element) => {
    const elementBloc = document.createElement("p");
    elementBloc.innerHTML = `${element} <i class="fa-solid fa-xmark"></i>`;
    elementBloc.setAttribute(
      "class",
      "flex justify-between items-center h-14 w-52 mt-7 p-4 font-medium rounded-lg bg-amber-300 filterData"
    );

    filterSpecificationZone.appendChild(elementBloc);
  });
}
