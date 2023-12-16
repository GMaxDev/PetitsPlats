import { ModelRecipe } from './ModelRecipe';
export class RecipeManager {
  constructor(data) {
    // this._data = data;
    // Utilisez ModelRecipe pour créer des instances de recette
    this._data = data.map(recipeData => new ModelRecipe(recipeData));
  }

  get recipeList() {
    return this._data
  }

  recipeFilter(filter) {
    // Convertit le filtre en minuscules pour une recherche insensible à la casse
    const lowercaseFilter = filter.toLowerCase();
  
    // Utilise la méthode filter pour créer un nouveau tableau contenant les éléments qui passent le filtre
    const arrayFilterResult = this.recipeList.filter(recipe => {
      // Vérifie si le filtre correspond à n'importe quelle propriété de la recette
      return Object.values(recipe).some(value => {
        if (typeof value === 'string') {
          // Si la propriété est une chaîne de caractères, vérifie si elle contient le filtre
          return value.toLowerCase().includes(lowercaseFilter);
        } else if (Array.isArray(value)) {
          // Si la propriété est un tableau, vérifie si l'un des éléments du tableau contient le filtre
          return value.some(item => typeof item === 'string' && item.toLowerCase().includes(lowercaseFilter));
        }
        // Ajoute d'autres vérifications de type au besoin
        return false;
      });
    });
  
    return arrayFilterResult
  }
  
  createRecipeCards() {
    return this._data.map(recipe => recipe.createRecipeCard());
  }
}
