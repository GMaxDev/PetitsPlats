import {
  ingredientList,
  applianceList,
  ustensilList,
} from "../utils/filterList";
export class RecipeManager {
  constructor(data) {
    this._data = data;
    this.recipeList = data;
  }

  recipeFilter(filter) {
    const arrayFilterResult = this._data.filter((recipe) => {
      const isSearchMatch = Object.values(recipe).some((value) => {
        let result = false;
        if (typeof value === "string") {
          // Si la propriété est une chaîne de caractères, vérifie si elle contient le filtre
          result = value.toLowerCase().includes(filter.toLowerCase());
        } else if (Array.isArray(value)) {
          // Si la propriété est un tableau, vérifie si l'un des éléments du tableau contient le filtre
          result = value.some(
            (item) =>
              typeof item === "string" &&
              item.toLowerCase().includes(filter.toLowerCase())
          );
        }

        // ----------------------------------------------
        return result;
      });

      let ingredientSearch = ingredientList.every((selectedIngredient) =>
        recipe.ingredients.some((recipeIngredient) =>
          recipeIngredient.ingredient
            .toLowerCase()
            .includes(selectedIngredient.toLowerCase())
        )
      );

      let applianceSearch = applianceList.every(
        (selectedAppliance) =>
          recipe.appliance.toLowerCase() === selectedAppliance.toLowerCase()
      );

      let ustensilSearch = ustensilList.every((selectedUstensil) =>
        recipe.ustensils.some((recipeUstensil) =>
          recipeUstensil.toLowerCase().includes(selectedUstensil.toLowerCase())
        )
      );

      return (
        isSearchMatch && ingredientSearch && applianceSearch && ustensilSearch
      );
    });
    // ----------------------------------------------

    this.recipeList = arrayFilterResult;
    console.log("Nouvelle liste: " + arrayFilterResult.length + " éléments");
    return this.recipeList;
  }

  createRecipeCards() {
    const recipeCards = [];
    for (let i = 0; i < this.recipeList.length; i++) {
      const recipeCard = document.createElement("div");
      recipeCard.setAttribute(
        "class",
        "recipeCard h-full bg-white rounded-3xl relative"
      );
      recipeCard.setAttribute("id", this.recipeList[i].name);

      recipeCard.innerHTML = `
      <img src="../../assets/img/${this.recipeList[i].image}" class="w-full h-64 object-cover rounded-t-3xl">
      <p class="recipeTime px-4 py-1.5 absolute top-5 right-5 text-xs rounded-xl bg-amber-300">${this.recipeList[i].time} min</p>
      <div class="recipeZone mt-6 mb-14 mx-6">
        <h3 class="font-bold text-lg mb-7">${this.recipeList[i].name}</h3>
        <h4 class="text-xs uppercase text-neutral-500 font-bold">Recette</h4>
        <p class="text-sm my-5 h-20 w-full overflow-hidden text-ellipsis">${this.recipeList[i].description}</p>
        <h4 class="text-xs uppercase text-neutral-500 font-bold">Ingrédients</h4>
        <div id="recipe_${this.recipeList[i].id}" class="grid sm:grid-cols-2 mt-4 ingredientZone"></div>
      </div>`;

      // -----------------------------------------------

      const ingredientZone = recipeCard.children[2].children[4];

      this.recipeList[i].ingredients.forEach((ingredient) => {
        const ingredientBloc = document.createElement("div");
        ingredientBloc.setAttribute("class", "ingredientBloc h-16");

        let ingredientQuantity = ingredient.quantity;
        let ingredientUnit = ingredient.unit;

        if (ingredientQuantity === undefined) {
          ingredientQuantity = "";
        }

        if (ingredientUnit === undefined) {
          ingredientUnit = "";
        }

        ingredientBloc.innerHTML = `
        <p class="ingredientName text-sm font-medium">${ingredient.ingredient}</p>
        <p class="ingredientQuantity text-neutral-500 text-sm">${ingredientQuantity}${ingredientUnit}</p>`;

        ingredientZone.appendChild(ingredientBloc);
      });
      recipeCards.push(recipeCard);
    }
    return recipeCards;
  }
}
