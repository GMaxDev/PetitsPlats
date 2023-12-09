export function displayActiveFilter(array) {
  const filterSpecificationZone = document.getElementById(
    "filterSpecificationZone"
  );
  filterSpecificationZone.innerText = "";

  array.forEach((element, index) => {
    const elementBloc = document.createElement("p");
    elementBloc.innerHTML = `${element} <i class="cross cursor-pointer fa-solid fa-xmark"></i>`;
    elementBloc.setAttribute(
      "class",
      "flex justify-between items-center h-14 w-52 mt-7 p-4 font-medium rounded-lg bg-amber-300 filterData"
    );

    const crossIcon = elementBloc.querySelector(".cross");
    crossIcon.addEventListener("click", () => {
      console.log(`Clic sur la croix de ${element} ${index}`);
      array.splice(index, 1);
      // Appelle à nouveau la fonction pour mettre à jour l'affichage
      displayActiveFilter(array);
      console.log(array)
    });

    filterSpecificationZone.appendChild(elementBloc);
  });
}
