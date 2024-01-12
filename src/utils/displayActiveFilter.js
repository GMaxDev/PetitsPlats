import { desactivateFilter } from "./dropdownFilter";
// Affiche le tableau de tous les filtres dans une 'filterSpecificationZone'
export function displayActiveFilter(data) {
  const filterSpecificationZone = document.getElementById(
    "filterSpecificationZone"
  );
  filterSpecificationZone.innerText = "";

  // Fonction pour créer un élément avec sa croix
  function createFilterElement(filter) {
    const elementBloc = document.createElement("p");
    elementBloc.innerHTML = `${filter.text}`;
    elementBloc.setAttribute("data-type", `${filter.type}`);

    const crossIcon = document.createElement("i");
    crossIcon.setAttribute("class", "cross cursor-pointer fa-solid fa-xmark");
    crossIcon.addEventListener("click", (event) => {
      desactivateFilter(event.target.parentElement);
    });

    elementBloc.setAttribute(
      "class",
      "flex justify-between items-center h-14 w-52 mt-7 p-4 font-medium rounded-lg bg-amber-300"
    );
    elementBloc.setAttribute("data-filteractive", "true");
    elementBloc.appendChild(crossIcon);

    return elementBloc;
  }

  // Si data est un tableau, traite-le comme avant
  data.forEach((element) => {
    const filterElement = createFilterElement(element);
    filterSpecificationZone.appendChild(filterElement);
  });
  // Aucune correspondance trouvée
  return "Aucune correspondance";
}