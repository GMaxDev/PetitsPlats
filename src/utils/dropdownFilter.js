import { displayActiveFilter } from "../utils/displayActiveFilter";
import { filterList } from "../utils/filterList";

// Ajoute des tableaux dans des listes de filtres
export function dropdownFilter(data) {
  const dropdownIngredients = document.getElementById("ingredientList");
  const dropdownAppliance = document.getElementById("applianceList");
  const dropdownUstensils = document.getElementById("ustensilsList");

  dropdownIngredients.innerHTML = `<ul
  id="ingredientFocus"
  class="flex flex-col items-start h-auto focus listBlocFilter"
></ul>`
  dropdownAppliance.innerHTML = `<ul
  id="applianceFocus"
  class="flex flex-col items-start w-auto h-auto focus listBlocFilter bg-amber-300"
></ul>`
  dropdownUstensils.innerHTML = `<ul
  id="ustensilsFocus"
  class="flex flex-col items-start h-auto focus listBlocFilter"
></ul>`
  //On créait des set pour vérifier que chaque élément de la liste est unique
  const existingIngredients = new Set();
  const existingAppliances = new Set();
  const existingUstensils = new Set();

  data.forEach((element) => {
    element.ingredients.forEach((ingredientArray) => {
      const ingredientName = ingredientArray.ingredient;

      // Vérifier si l'ingrédient n'a pas déjà été ajouté
      if (!existingIngredients.has(ingredientName)) {
        const ingredientItemLi = document.createElement("li");
        ingredientItemLi.innerHTML = ingredientName;
        ingredientItemLi.setAttribute("class", "pl-4 py-2 cursor-pointer ingredient");
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
      applianceItemLi.setAttribute("class", "pl-4 py-2 cursor-pointer appliance");
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
        ustensilItemLi.setAttribute("class", "pl-4 py-2 cursor-pointer ustensil");
        dropdownUstensils.appendChild(ustensilItemLi);

        existingUstensils.add(ustensilName);
      }
    });
  });

  // -----------------------------------------------

  dropdownIngredients.addEventListener("click", (event) => handleFilterItemClick(event, "ingredient"));
  dropdownAppliance.addEventListener("click", (event) => handleFilterItemClick(event, "appliance"));
  dropdownUstensils.addEventListener("click", (event) => handleFilterItemClick(event, "ustensils"));

}

function filterItemDisplay(liValue, listType) {
  const idList = listType + "Focus";
  const focus = document.getElementById(idList);

  if (!focus.querySelector(`[filterActive="${liValue}"]`) && filterList.indexOf(liValue) === -1) {
    // Ajoute à la liste focus
    const liElement = document.createElement("li");
    liElement.setAttribute("filterActive", liValue);
    liElement.setAttribute("class", "flex justify-between items-center h-14 text-left rounded-none px-4 py-2 cursor-pointer bg-amber-400 w-full");
    liElement.innerHTML = `${liValue} <i class="cross cursor-pointer fa-solid fa-xmark"></i>`;

    liElement.querySelector(".cross").addEventListener("click", () => {
      // Supprime de la liste focus et de la liste principale
      liElement.removeAttribute('filterActive')
    });

    focus.appendChild(liElement);

    // Ajoute à la liste principale
    filterList.push(liValue);
    displayActiveFilter(filterList);
  }
}


function handleFilterItemClick(event, listType) {
  if (event.target.tagName === 'LI') {
    const filterActiveValue = event.target.getAttribute("filteractive");

    if (!filterActiveValue) {
      const liValue = event.target.innerText;
      event.target.remove();
      filterItemDisplay(liValue, listType);
    }
  }
}
