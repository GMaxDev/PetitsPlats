export class ModelRecipe {
  constructor(data) {
    this._id = data.id;
    this._image = data.image;
    this._name = data.name;
    this._servings = data.servings;
    this._ingredients = data.ingredients;
    this._time = data.time;
    this._description = data.description;
    this._appliance = data.appliance;
    this._ustensils = data.ustensils;
  }

  get id() {
    return this._id;
  }

  get image() {
    return this._image;
  }

  get name() {
    return this._name;
  }

  get servings() {
    return this._servings;
  }

  get ingredients() {
    return this._ingredients;
  }

  get time() {
    return this._time;
  }

  get description() {
    return this._description;
  }

  get appliance() {
    return this._appliance;
  }

  get ustensils() {
    return this._ustensils;
  }

  // ----------------------------------------------

  createRecipeCard() {
    const recipeCard = document.createElement("div");
    recipeCard.setAttribute(
      "class",
      "recipeCard h-full bg-white rounded-3xl relative"
    );
    recipeCard.setAttribute("id", this._name);

    recipeCard.innerHTML = `
    <img src="../../assets/img/${this._image}" class="w-full h-64 object-cover rounded-t-3xl">
    <p class="recipeTime px-4 py-1.5 absolute top-5 right-5 text-xs rounded-xl bg-amber-300">${this._time} min</p>
    <div class="recipeZone mt-6 mb-14 mx-6">
      <h3 class="font-bold text-lg mb-7">${this._name}</h3>
      <h4 class="text-xs uppercase text-neutral-500 font-bold">Recette</h4>
      <p class="text-sm my-5 h-20 w-full overflow-hidden text-ellipsis">${this._description}</p>
      <h4 class="text-xs uppercase text-neutral-500 font-bold">Ingrédients</h4>
      <div id="recipe_${this._id}" class="grid grid-cols-2 mt-4 ingredientZone"></div>
  </div>`;

    // -----------------------------------------------

    const ingredientZone = recipeCard.children[2].children[4];

    this._ingredients.forEach((ingredient) => {
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

    return recipeCard;
  }
}
