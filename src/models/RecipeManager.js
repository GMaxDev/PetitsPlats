import { filterList } from "../utils/filterList";
export class RecipeManager {
  constructor(data) {
    this._data = data;
    this.recipeList = data
  }

  recipeFilter(filter) {
    const lowercaseFilter = filter; // Convertit le filtre en minuscule

    // Utilise la méthode filter pour créer un nouveau tableau contenant les éléments qui passent le filtre
    const arrayFilterResult = this.recipeList.filter((recipe) => {
      // Vérifie si le filtre correspond à n'importe quelle propriété de la recette
      return Object.values(recipe).some((value) => {
        let result = false
        if (typeof value === "string") {
          // Si la propriété est une chaîne de caractères, vérifie si elle contient le filtre
          result = value.toLowerCase().includes(lowercaseFilter);
        } else if (Array.isArray(value)) {
          // Si la propriété est un tableau, vérifie si l'un des éléments du tableau contient le filtre
          result = value.some(
            (item) =>
              typeof item === "string" &&
              item.toLowerCase().includes(lowercaseFilter)
          );
        }
            // Vérifie si tous les termes de recherche sont présents dans la recette
          const termsFound = filterList.every(term => {
            return Object.values(recipe).some(value => {
              if (typeof value === 'string') {
                return value.toLowerCase().includes(term.toLowerCase());
              } else if (Array.isArray(value)) {
                return value.some(item => typeof item === 'string' && item.toLowerCase().includes(term.toLowerCase()));
              }
              return false;
            });
          });
        return result;
      });
    });
    
    this.recipeList = arrayFilterResult
    return arrayFilterResult;
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
        <div id="recipe_${this.recipeList[i].id}" class="grid grid-cols-2 mt-4 ingredientZone"></div>
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
