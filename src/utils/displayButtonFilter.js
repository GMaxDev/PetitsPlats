// Affiche ou non la div avec la liste des filtres
export function toggleButtonFilter(filterName) {
  const buttonName = filterName + "List";
  const buttonFilter = document.getElementById(buttonName);

  if (buttonFilter.classList.contains("visible")) {
    closebuttonFilter(filterName);
  } else {
    displaybuttonFilter(filterName);
  }
}

function displaybuttonFilter(filterName) {
  const buttonName = filterName + "List";
  const buttonFilter = document.getElementById(buttonName);
  const searchName = filterName + "Search";
  const searchFilter = document.getElementById(searchName);

  buttonFilter.setAttribute(
    "class",
    "top-24 visible list-none absolute flex flex-col rounded-b-lg items-start overflow-auto listBlocFilter max-h-80 z-1"
  );
  searchFilter.setAttribute("class", "top-12 absolute px-3 py-2 bg-white w-44");
}

function closebuttonFilter(filterName) {
  const buttonName = filterName + "List";
  const buttonFilter = document.getElementById(buttonName);
  const searchName = filterName + "Search";
  const searchFilter = document.getElementById(searchName);

  buttonFilter.setAttribute("class", "invisible w-0 h-0");
  searchFilter.setAttribute("class", "invisible w-0 h-0");
}
