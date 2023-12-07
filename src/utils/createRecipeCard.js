export function createRecipeCard(recipeInstances) {
  const recipeCardZone = document.getElementById("recipeCardZone");

  recipeInstances.forEach((recipeInstance) => {
    const recipeCard = document.createElement("div");
    const recipeZone = document.createElement("div");
    const recipteTime = document.createElement("p");
    const ingredientZone = document.createElement("div");
    const h3 = document.createElement("h3");
    const h4Recipe = document.createElement("h4");
    const h4Ingredients = document.createElement("h4");
    const p = document.createElement("p");
    const img = document.createElement("img");

    // const cheminImage = `assets/img/`;

    recipeCard.setAttribute(
      "class",
      "recipeCard h-full bg-white rounded-3xl relative"
    );
    recipeCard.setAttribute(
      "id",
      recipeInstance.name
    );

    recipteTime.innerHTML = recipeInstance.time + `min`;
    recipteTime.setAttribute(
      "class",
      "recipeTime px-4 py-1.5 absolute top-5 right-5 text-xs rounded-xl bg-amber-300"
    );

    recipeZone.setAttribute("class", "recipeZone mt-6 mb-14 mx-6");

    img.src = `../../assets/img/${recipeInstance.image}`;
    img.setAttribute("class", "w-full h-64 object-cover rounded-t-3xl");

    h3.innerHTML = recipeInstance.name;
    h3.setAttribute("class", "font-bold text-lg mb-7");

    h4Recipe.innerHTML = "Recette";
    h4Recipe.setAttribute(
      "class",
      "text-xs uppercase  text-neutral-500 font-bold"
    );

    p.innerHTML = recipeInstance.description;
    p.setAttribute(
      "class",
      "text-sm mt-5 h-20 w-full overflow-hidden text-ellipsis"
    );

    h4Ingredients.innerHTML = "Ingrédients";
    h4Ingredients.setAttribute(
      "class",
      "text-xs uppercase mt-4 text-neutral-500 font-bold"
    );

    ingredientZone.setAttribute(
      "class",
      "grid grid-cols-2 mt-4 ingredientZone"
    );

    // -----------------------------------------------

    recipeCardZone.appendChild(recipeCard);

    recipeCard.appendChild(img);
    recipeCard.appendChild(recipteTime);
    recipeCard.appendChild(recipeZone);

    recipeZone.appendChild(h3);
    recipeZone.appendChild(h4Recipe);
    recipeZone.appendChild(p);
    recipeZone.appendChild(h4Ingredients);
    recipeZone.appendChild(ingredientZone);

    if (recipeInstance.ingredients) {
      recipeInstance.ingredients.forEach((ingredient) => {
        const ingredientBloc = document.createElement("div");
        const ingredientName = document.createElement("p");
        const ingredientQuantity = document.createElement("p");

        ingredientBloc.setAttribute("class", "ingredientBloc h-16");
        ingredientZone.appendChild(ingredientBloc);

        ingredientName.innerHTML = ingredient.ingredient;
        ingredientName.setAttribute(
          "class",
          "ingredientName text-sm font-medium"
        );
        ingredientBloc.appendChild(ingredientName);

        if (ingredient.quantity !== undefined) {
          ingredientQuantity.innerHTML = ingredient.quantity;
          ingredientQuantity.setAttribute(
            "class",
            "ingredientQuantity text-neutral-500 text-sm"
          );

          if (ingredient.unit) {
            ingredientQuantity.innerHTML += ingredient.unit;
          }
        } else {
          ingredientQuantity.innerHTML = "-";
        }
        ingredientBloc.appendChild(ingredientQuantity);
      });
    }
  });
}
