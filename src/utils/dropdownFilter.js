import { displayActiveFilter } from "../utils/displayActiveFilter";
import { filterList, mainSearch } from "../utils/filterList";
import { totalRecipeUpdate } from "../utils/totalRecipeUpdate";

const dropdownIngredients = document.getElementById("ingredientList");
const dropdownAppliance = document.getElementById("applianceList");
const dropdownUstensils = document.getElementById("ustensilsList");

// Ajoute des tableaux dans des listes de filtres
export function dropdownFilter(data) {
  //On nettoie le contenu des dropdowns
  dropdownIngredients.innerHTML = ''
  dropdownAppliance.innerHTML = ''
  dropdownUstensils.innerHTML = ''
  //On purge les filtres actifs
  filterList.splice(0, filterList.length)
  displayActiveFilter(filterList)

  //On créait des set pour vérifier que chaque élément de la liste est unique
  const existingIngredients = new Set();
  const existingAppliances = new Set();
  const existingUstensils = new Set();

  data.forEach((element) => {
    // En fonction des du type de l'élément, on l'ajoute au dropdown correspondant

    element.ingredients.forEach((ingredientArray) => {
      const ingredientName = ingredientArray.ingredient;
      // Vérifier si l'ingrédient n'a pas déjà été ajouté
      if (!existingIngredients.has(ingredientName)) {
        const ingredientItemLi = document.createElement("li");
        ingredientItemLi.innerHTML = ingredientName;
        ingredientItemLi.setAttribute(
          "class",
          "pl-4 py-2 cursor-pointer ingredient"
        );
        dropdownIngredients.appendChild(ingredientItemLi);

        existingIngredients.add(ingredientName);
      }
    });

    // --------------

    const applianceName = element.appliance;
    // Vérifier si l'appareil n'a pas déjà été ajouté
    if (!existingAppliances.has(applianceName)) {
      const applianceItemLi = document.createElement("li");
      applianceItemLi.innerHTML = applianceName;
      applianceItemLi.setAttribute(
        "class",
        "pl-4 py-2 cursor-pointer appliance"
      );
      dropdownAppliance.appendChild(applianceItemLi);

      existingAppliances.add(applianceName);
    }

    // -------------

    element.ustensils.forEach((ustensilArray) => {
      const ustensilName = ustensilArray;

      // Vérifier si l'ustensile n'a pas déjà été ajouté
      if (!existingUstensils.has(ustensilName)) {
        const ustensilItemLi = document.createElement("li");
        ustensilItemLi.innerHTML = ustensilName;
        ustensilItemLi.setAttribute(
          "class",
          "pl-4 py-2 cursor-pointer ustensil"
        );
        dropdownUstensils.appendChild(ustensilItemLi);

        existingUstensils.add(ustensilName);
      }
    });
  });

  // -----------------------------------------------

  // Si on clique sur un élément d'un dropdown, on lui modifie son état de focus
  dropdownIngredients.addEventListener("click", (event) => {
    handleFilterItemClick(event);
  });
  dropdownAppliance.addEventListener("click", (event) => {
    handleFilterItemClick(event);
  });
  dropdownUstensils.addEventListener("click", (event) => {
    handleFilterItemClick(event);
  });
}

// On vérifie l'état de attribut 'filteractive'
export function handleFilterItemClick(event) {
  const filterActiveValue = event.target.dataset.filteractive;
  const liValue = event.target;
  if (!filterActiveValue && liValue.nodeName === "LI") {
    const parentList = liValue.parentElement;
  
    const crossIcon = document.createElement("i");
    crossIcon.setAttribute("class", "cross cursor-pointer fa-solid fa-xmark");
    crossIcon.addEventListener("click", () => {
      deactivateFilter(liValue);
    });
  
    liValue.setAttribute("data-filteractive", "true");
    liValue.setAttribute(
      "class",
      "flex justify-between items-center h-14 text-left rounded-none px-4 py-2 cursor-pointer bg-amber-400 w-full"
    );
    liValue.appendChild(crossIcon);
  
    parentList.prepend(liValue); // Place l'élément focus en haut de la liste correspondante
    filterList.push(liValue.innerText); // Ajoute à la liste des filtres
    displayActiveFilter(filterList); // Affiche l'élément dans la zone de filtre globale
  
    // filterRecipes(mainSearch[0], filterList);  
  }
}

export function filterRecipes(recipes, searchTerms) {
  let listNewRecipes = document.querySelectorAll('.recipeCard').length;

  console.log('Nombre de recettes correspondantes: ' + listNewRecipes); 
  totalRecipeUpdate(listNewRecipes)
}

function deactivateFilter(liValue) {
  liValue.removeAttribute("data-filteractive");
  liValue.setAttribute("class", "pl-4 py-2 cursor-pointer"); // Remet le design initial

  // Retire l'élément de la liste des filtres
  const filterIndex = filterList.indexOf(liValue.innerText);
  if (filterIndex !== -1) {
    filterList.splice(filterIndex, 1);
  }

  // Retire l'élément de l'affichage global des filtres
  displayActiveFilter(filterList);

  // Supprime uniquement la croix de l'élément <i>
  const crossIcon = liValue.querySelector(".cross");
  if (crossIcon) {
    crossIcon.remove();
  }

  // Déplace l'élément à la fin de la liste des éléments sélectionnés
  const parentList = liValue.parentElement;
  parentList.appendChild(liValue);

  // Met à jour les recettes en fonction des filtres
  filterRecipes(mainSearch.current, filterList);
  console.log(filterList);
}
