// Affiche ou non la div avec la liste des filtres
export function toggleButtonFilter(filterName) {
  const buttonName = filterName + "List";
  const buttonFilter = document.getElementById(buttonName);

  if (buttonFilter.classList.contains("visible")) {
    closebuttonFilter(filterName)
  } else {
    displaybuttonFilter(filterName)
  }
}

function displaybuttonFilter(filterName) {
  const buttonName = filterName + "List"
  const buttonFilter = document.getElementById(buttonName);

  buttonFilter.setAttribute("class", "visible list-none absolute flex flex-col rounded-b-lg items-start overflow-auto listBlocFilter max-h-80 z-1")
}

function closebuttonFilter(filterName) {
  const buttonName = filterName + "List"
  const buttonFilter = document.getElementById(buttonName);

  buttonFilter.setAttribute("class", "invisible w-0 h-0")
}