import { displayActiveFilter } from "../utils/displayActiveFilter";
import { filterList } from "../utils/filterList";

export function dropdownFilter(data) {
  const dropdownIngredients = document.getElementById("ingredientList");
  const dropdownAppliance = document.getElementById("applianceList");
  const dropdownUstensils = document.getElementById("ustensilsList");

  dropdownIngredients.innerHTML = ''
  dropdownAppliance.innerHTML = ''
  dropdownUstensils.innerHTML = ''
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
        ingredientItemLi.setAttribute("class", "pl-4 py-2 cursor-pointer");
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
      applianceItemLi.setAttribute("class", "pl-4 py-2 cursor-pointer");
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
        ustensilItemLi.setAttribute("class", "pl-4 py-2 cursor-pointer");
        dropdownUstensils.appendChild(ustensilItemLi);

        existingUstensils.add(ustensilName);
      }
    });
  });

  // -----------------------------------------------

  dropdownIngredients.addEventListener("click", (event) => {
    const ingredient = "ingredient"
    if (event.target.tagName === 'LI') {
      const filterActiveValue = event.target.getAttribute("filteractive");
    
      if (!filterActiveValue) {
        const liValue = event.target.innerText
        dropdownIngredients.removeChild(event.target)
        filterItemDisplay(liValue, ingredient)
      }
    }
  })

  dropdownAppliance.addEventListener("click", (event) => {
    const appliance = "appliance"
    if (event.target.tagName === 'LI') {
      const filterActiveValue = event.target.getAttribute("filteractive");
    
      if (!filterActiveValue) {
        const liValue = event.target.innerText
        dropdownAppliance.removeChild(event.target)
        filterItemDisplay(liValue, appliance)
        console.log(event.target)
      }
    }
  })

  dropdownUstensils.addEventListener("click", (event) => {
    const ustensils = "ustensils"
    if (event.target.tagName === 'LI') {
      const filterActiveValue = event.target.getAttribute("filteractive");
    
      if (!filterActiveValue) {
        const liValue = event.target.innerText
        dropdownUstensils.removeChild(event.target)
        filterItemDisplay(liValue, ustensils)
        console.log(event.target)
      }
    }
  })
}

function filterItemDisplay(liValue, listType) {
  const idList = listType + "Focus";
  const focus = document.getElementById(idList);

  // Vérifie si un élément avec le même ID existe déjà
  if (!focus.querySelector(`[filterActive="${liValue}"]`)) {
    const liElement = document.createElement("li");
    liElement.setAttribute("filterActive", liValue);
    liElement.setAttribute("class", "flex justify-between items-center py-2 text-left rounded-none px-4 py-2 cursor-pointer bg-amber-400 w-full");
    liElement.innerHTML = `${liValue} <i class="cross cursor-pointer fa-solid fa-xmark"></i>`;

    focus.appendChild(liElement);
    filterList.push(liValue);
    displayActiveFilter(filterList)
    console.log(filterList)
  }
}
