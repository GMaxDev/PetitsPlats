import { displayActiveFilter } from "../utils/displayActiveFilter";
import { handleDropdownOptionClick } from "../pages/main";
import {
  filterList,
  applianceList,
  ustensilList,
  ingredientList,
} from "../utils/filterList";

const dropdownIngredients = document.getElementById("ingredientList");
const dropdownAppliance = document.getElementById("applianceList");
const dropdownUstensils = document.getElementById("ustensilList");

// Ajoute des tableaux dans des listes de filtres
export function dropdownFilter(data) {
  // On stocke les éléments à conserver
  const activeIngredients = Array.from(dropdownIngredients.children).filter(
    (li) => li.getAttribute("data-filteractive") === "true"
  );

  const activeAppliances = Array.from(dropdownAppliance.children).filter(
    (li) => li.getAttribute("data-filteractive") === "true"
  );

  const activeUstensils = Array.from(dropdownUstensils.children).filter(
    (li) => li.getAttribute("data-filteractive") === "true"
  );

  // On nettoie le contenu des dropdowns et des inputsearch
  dropdownIngredients.innerHTML = "";
  dropdownAppliance.innerHTML = "";
  dropdownUstensils.innerHTML = "";

  const ingredientSearchInput = document.getElementById(
    "ingredientSearchInput"
  );
  const applianceSearchInput = document.getElementById("applianceSearchInput");
  const ustensilSearchInput = document.getElementById("ustensilSearchInput");

  ingredientSearchInput.value = "";
  applianceSearchInput.value = "";
  ustensilSearchInput.value = "";

  // On réinsère les éléments actifs
  activeIngredients.forEach((li) => dropdownIngredients.appendChild(li));
  activeAppliances.forEach((li) => dropdownAppliance.appendChild(li));
  activeUstensils.forEach((li) => dropdownUstensils.appendChild(li));

  //On met à jour les filtres actifs
  displayActiveFilter(filterList);

  //On créait des set pour vérifier que chaque élément de la liste est unique
  const existingIngredients = new Set();
  const existingAppliances = new Set();
  const existingUstensils = new Set();

  // -------------------------------------------------

  data.forEach((element) => {
    // En fonction du type de l'élément, on l'ajoute au dropdown correspondant

    element.ingredients.forEach((ingredientArray) => {
      const ingredientName = ingredientArray.ingredient;
      const isIngredientActive = activeIngredients.some(
        (li) => li.textContent.trim() === ingredientName
      );
      // Vérifier si l'ingrédient n'a pas déjà été ajouté
      if (!existingIngredients.has(ingredientName) && !isIngredientActive) {
        const ingredientItemLi = document.createElement("li");
        ingredientItemLi.innerHTML = ingredientName;
        ingredientItemLi.setAttribute("class", "pl-4 py-2 cursor-pointer");
        ingredientItemLi.setAttribute("data-type", "ingredient");

        dropdownIngredients.appendChild(ingredientItemLi);

        existingIngredients.add(ingredientName);
      }
    });

    // --------------

    const applianceName = element.appliance;
    const isApplianceActive = activeAppliances.some(
      (li) => li.textContent.trim() === applianceName
    );
    // Vérifier si l'appareil n'a pas déjà été ajouté
    if (!existingAppliances.has(applianceName) && !isApplianceActive) {
      const applianceItemLi = document.createElement("li");
      applianceItemLi.innerHTML = applianceName;
      applianceItemLi.setAttribute("class", "pl-4 py-2 cursor-pointer");
      applianceItemLi.setAttribute("data-type", "appliance");
      dropdownAppliance.appendChild(applianceItemLi);

      existingAppliances.add(applianceName);
    }

    // -------------

    element.ustensils.forEach((ustensilArray) => {
      const ustensilName = ustensilArray;
      const isUstensilActive = activeUstensils.some(
        (li) => li.textContent.trim() === ustensilName
      );

      // Vérifier si l'ustensile n'a pas déjà été ajouté
      if (!existingUstensils.has(ustensilName) && !isUstensilActive) {
        const ustensilItemLi = document.createElement("li");
        ustensilItemLi.innerHTML = ustensilName;
        ustensilItemLi.setAttribute("class", "pl-4 py-2 cursor-pointer");
        ustensilItemLi.setAttribute("data-type", "ustensil");
        dropdownUstensils.appendChild(ustensilItemLi);

        existingUstensils.add(ustensilName);
      }
    });
  });

  // ------------------------------------------

  const ingredientListDisplay = document.getElementById("ingredientList");
  const applianceListDisplay = document.getElementById("applianceList");
  const ustensilListDisplay = document.getElementById("ustensilList");

  ingredientSearchInput.addEventListener("input", (event) => {
    const valueIngredientSearchInput = event.target.value.toLowerCase();
    const ingredientList = ingredientListDisplay.querySelectorAll("li");

    for (let i = 0; i < ingredientList.length; i++) {
      const listItemText = ingredientList[i].textContent.toLowerCase();

      // Vérifier si le texte de l'élément contient le terme de recherche
      if (listItemText.includes(valueIngredientSearchInput)) {
        ingredientList[i].style.display = "flex";
      } else {
        ingredientList[i].style.display = "none";
      }
    }
  });

  // ------

  applianceSearchInput.addEventListener("input", (event) => {
    const valueApplianceSearchInput = event.target.value.toLowerCase();
    const applianceList = applianceListDisplay.querySelectorAll("li");

    for (let i = 0; i < applianceList.length; i++) {
      const listItemText = applianceList[i].textContent.toLowerCase();

      // Vérifier si le texte de l'élément contient le terme de recherche
      if (listItemText.includes(valueApplianceSearchInput)) {
        applianceList[i].style.display = "flex";
      } else {
        applianceList[i].style.display = "none";
      }
    }
  });

  // ------

  ustensilSearchInput.addEventListener("input", (event) => {
    const valueUstensilSearchInput = event.target.value.toLowerCase();
    const ustensilList = ustensilListDisplay.querySelectorAll("li");

    for (let i = 0; i < ustensilList.length; i++) {
      const listItemText = ustensilList[i].textContent.toLowerCase();

      // Vérifier si le texte de l'élément contient le terme de recherche
      if (listItemText.includes(valueUstensilSearchInput)) {
        ustensilList[i].style.display = "flex";
      } else {
        ustensilList[i].style.display = "none";
      }
    }
  });
}

// On vérifie l'état de attribut 'filteractive'
export function handleFilterItemClick(event) {
  if (event) {
    const filterActiveValue = event.target.dataset.filteractive;
    const liValue = event.target;

    if (!filterActiveValue && liValue.nodeName === "LI") {
      switch (event.target.dataset.type) {
      case "ingredient":
        console.log("Cet élément est un ingrédient");
        ingredientList.push(liValue.innerHTML);
        break;
      case "appliance":
        console.log("Cet élément est un appareil");
        applianceList.push(liValue.innerHTML);
        break;
      case "ustensil":
        console.log("Cet élément est un ustensile");
        ustensilList.push(liValue.innerHTML);
        break;
      }

      const parentList = liValue.parentElement;

      const crossIcon = document.createElement("i");
      crossIcon.setAttribute("class", "cross cursor-pointer fa-solid fa-xmark");
      crossIcon.addEventListener("click", (event) => {
        desactivateFilter(liValue);
        handleDropdownOptionClick(event);
      });

      liValue.setAttribute("data-filteractive", "true");
      liValue.setAttribute(
        "class",
        "flex justify-between items-center h-11 text-left rounded-none px-4 py-2 cursor-pointer bg-amber-400 w-full"
      );
      liValue.appendChild(crossIcon);

      parentList.prepend(liValue); // Place l'élément focus en haut de la liste correspondante
      filterList.push({ text: liValue.innerText, type: liValue.dataset.type });
      // Ajoute à la liste des filtres
      displayActiveFilter(filterList); // Affiche l'élément dans la zone de filtre globale
    }
  }

  // ------------------------------

  console.log(ingredientList);
  console.log(applianceList);
  console.log(ustensilList);
}

export function desactivateFilter(liValue) {
  if (liValue.nodeName === "P") {
    const valueType = liValue.dataset.type + "List";
    const liLength = document
      .getElementById(valueType)
      .getElementsByTagName("li").length;
    for (let i = 0; i < liLength; i++) {
      const liInnerText =
        document.getElementById(valueType).childNodes[i].innerText;
      if (liValue.innerText === liInnerText) {
        const liDrop = document.getElementById(valueType).childNodes[i];
        liDrop.removeAttribute("data-filteractive");
        liDrop.setAttribute("class", "pl-4 py-2 cursor-pointer");

        const crossIcon = liDrop.querySelector(".cross");
        if (crossIcon) {
          crossIcon.remove();
        }
        if (liDrop.parentElement) {
          liDrop.parentElement.appendChild(liDrop);
        }
      }
    }
  }
  liValue.removeAttribute("data-filteractive");
  liValue.setAttribute("class", "pl-4 py-2 cursor-pointer"); // Remet le design initial

  // Retire l'élément de la liste des filtres
  const filterIndex = filterList.findIndex(
    (item) => item.text === liValue.innerText
  );
  if (filterIndex !== -1) {
    filterList.splice(filterIndex, 1);
  }

  switch (liValue.dataset.type) {
  case "ingredient":
    ingredientList.splice(ingredientList.indexOf(liValue.innerText), 1);
    break;
  case "appliance":
    applianceList.splice(applianceList.indexOf(liValue.innerText), 1);
    break;
  case "ustensil":
    ustensilList.splice(ustensilList.indexOf(liValue.innerText), 1);
    break;
  }

  // Retire l'élément de l'affichage global des filtres
  displayActiveFilter(filterList);
  handleDropdownOptionClick();

  // Supprime uniquement la croix de l'élément <i>
  const crossIcon = liValue.querySelector(".cross");
  if (crossIcon) {
    crossIcon.remove();
  }

  // Déplace l'élément à la fin de la liste des éléments sélectionnés
  if (liValue.parentElement) {
    liValue.parentElement.appendChild(liValue);
  }
}
