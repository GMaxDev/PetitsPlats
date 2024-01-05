import { filterList, ingredientList, applianceList, ustensilList } from "../utils/filterList";
export class RecipeManager {
  constructor(data) {
    this._data = data;
    this.recipeList = data;
  }

  recipeFilter(filter, tagList) {
    console.log(
      "Filtre tapé : " + filter + "; Liste des tags sélectionné : " + tagList
    );

    const arrayFilterResult = this._data.filter((recipe) => {
      return Object.values(recipe).some((value) => {
        let result = false;
        if (typeof value === "string") {
          // Si la propriété est une chaîne de caractères, vérifie si elle contient le filtre
          result = value.toLowerCase().includes(filter.toLowerCase());
        } else if (Array.isArray(value)) {
          // Si la propriété est un tableau, vérifie si l'un des éléments du tableau contient le filtre
          result = value.some(
            (item) =>
              typeof item === "string" && item.toLowerCase().includes(filter.toLowerCase())
          );
        }

        // ----------------------------------------------

        if(ingredientList.length > 0){
          for(let i=0; i<ingredientList.length; i++){
            if (typeof value === "string") {
              result =  value.toLowerCase().includes(ingredientList[i].toLowerCase());
            } else if (Array.isArray(value)) {
              result = value.some(
                (item) =>
                  typeof item === "string" && item.toLowerCase().includes(ingredientList[i].toLowerCase())
              );
            }
          }
        }

        if(applianceList.length > 0){
          for(let i=0; i<applianceList.length; i++){
            if (typeof value === "string") {
              result =  value.toLowerCase().includes(applianceList[i].toLowerCase());
            } else if (Array.isArray(value)) {
              result = value.some(
                (item) =>
                  typeof item === "string" && item.toLowerCase().includes(applianceList[i].toLowerCase())
              );
            }
          }
        }


        if(ustensilList.length > 0){
          for(let i=0; i<ustensilList.length; i++){
            if (typeof value === "string") {
              result =  value.toLowerCase().includes(ustensilList[i].toLowerCase());
            } else if (Array.isArray(value)) {
              result = value.some(
                (item) =>
                  typeof item === "string" && item.toLowerCase().includes(ustensilList[i].toLowerCase())
              );
            }
          }
        }
        return result
      });
    });

    // ----------------------------------------------

    this.recipeList = arrayFilterResult;
    console.log("Nouvelle liste: " + arrayFilterResult.length + " éléments");
    return this.recipeList;
  }

  // recipeFilter(filter, tagList) {
  //   console.log("Filtre tapé : "+filter+"; Liste des tags sélectionné : "+tagList)

  //   const arrayFilterResult = this.recipeList.filter((recipe) => {
  //     // Vérifie si le filtrce correspond à n'importe quelle propriété de la recette
  //     return Object.values(recipe).some((value) => {
  //       let result = false
  //       if (typeof value === "string") {
  //         // Si la propriété est une chaîne de caractères, vérifie si elle contient le filtre
  //         result = value.toLowerCase().includes(filter);
  //       } else if (Array.isArray(value)) {
  //         // Si la propriété est un tableau, vérifie si l'un des éléments du tableau contient le filtre
  //         result = value.some(
  //           (item) =>
  //             typeof item === "string" &&
  //             item.toLowerCase().includes(filter)
  //         );
  //       }
  //           // Vérifie si tous les termes de recherche sont présents dans la recette
  //         // const termsFound = filterList.every(term => {
  //         //   return Object.values(recipe).some(value => {
  //         //     if (typeof value === 'string') {
  //         //       return value.toLowerCase().includes(term.toLowerCase());
  //         //     } else if (Array.isArray(value)) {
  //         //       return value.some(item => typeof item === 'string' && item.toLowerCase().includes(term.toLowerCase()));
  //         //     }
  //         //     return false;
  //         //   });
  //         // });

  //       return result;
  //     });
  //   });

  //   this.recipeList = arrayFilterResult
  //   return arrayFilterResult;
  // }

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
