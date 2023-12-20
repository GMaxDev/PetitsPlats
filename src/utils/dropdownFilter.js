import { displayActiveFilter } from "../utils/displayActiveFilter";
import { filterList } from "../utils/filterList";

const dropdownIngredients = document.getElementById("ingredientList");
const dropdownAppliance = document.getElementById("applianceList");
const dropdownUstensils = document.getElementById("ustensilsList");

// Ajoute des tableaux dans des listes de filtres
export function dropdownFilter(data) {
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
    // dropdownIngredients.removeEventListener("click", (event))
  });
  dropdownAppliance.addEventListener("click", (event) => {
    handleFilterItemClick(event);
    // dropdownAppliance.removeEventListener("click", (event))
  });
  dropdownUstensils.addEventListener("click", (event) => {
    handleFilterItemClick(event);
    // dropdownUstensils.removeEventListener("click", (event))
  });
}

// On vérifie l'état de attribut 'filteractive'
function handleFilterItemClick(event) {
  const filterActiveValue = event.target.dataset.filteractive;
  const liValue = event.target;
  if (!filterActiveValue && liValue.nodeName === "LI") {
    filterItemDisplay(liValue);
  }
}

function filterItemDisplay(liValue) {
  // Ajoute à la liste focus
  const parentList = liValue.parentElement;

  liValue.setAttribute("data-filteractive", "true");
  liValue.setAttribute(
    "class",
    "flex justify-between items-center h-14 text-left rounded-none px-4 py-2 cursor-pointer bg-amber-400 w-full"
  );
  liValue.innerHTML += `<i class="cross cursor-pointer fa-solid fa-xmark"></i>`;

  parentList.prepend(liValue); // Place l'élément focus en haut de la liste correspondante
  filterList.push(liValue.innerText); // Ajoute à la liste principale si l'élément n
  displayActiveFilter(filterList); // Affiche l'élément dans la zone de filtre globale
}
