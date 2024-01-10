// Affiche le tableau de tous les filtres dans une 'filterSpecificationZone'
export function displayActiveFilter(data) {
  const filterSpecificationZone = document.getElementById(
    "filterSpecificationZone"
  );
  filterSpecificationZone.innerText = "";

  // Si data est un tableau, traite-le comme avant
  data.forEach((element) => {
    const elementBloc = document.createElement("p");
    elementBloc.innerHTML = `${element}`;
    elementBloc.setAttribute('id', `${element}`)
    elementBloc.setAttribute(
      "class",
      "flex justify-between items-center h-14 w-52 mt-7 p-4 font-medium rounded-lg bg-amber-300"
    );
    elementBloc.setAttribute("data-filteractive", "true")

    filterSpecificationZone.appendChild(elementBloc);
  });
  // Aucune correspondance trouvée
  return "Aucune correspondance";
}