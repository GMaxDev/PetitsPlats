// Met à jour le nombre de recettes affichée
export function totalRecipeUpdate(data) {
  const totalRecipe = document.getElementById("totalRecipe");

  if (Array.isArray(data)) {
    // Si c'est un tableau, utilise sa longueur
    totalRecipe.innerHTML = `${data.length} recettes`;
  } else if (typeof data === "number") {
    // Si c'est un nombre, utilise directement la valeur
    totalRecipe.innerHTML = `${data} recettes`;
  } else {
    // Gère d'autres types d'arguments si nécessaire
    console.error("Type d'argument non pris en charge");
  }
}
