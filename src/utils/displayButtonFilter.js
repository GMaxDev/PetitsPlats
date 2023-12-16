export function toggleButtonFilter(filterName) {
  const buttonName = filterName + "List";
  const buttonFilter = document.getElementById(buttonName);

  if (buttonFilter.classList.contains("visible")) {
    closebuttonFilter(filterName)
    console.log("closebuttonFilter")
  } else {
    displaybuttonFilter(filterName)
    console.log("displaybuttonFilter")
  }
}

function displaybuttonFilter(filterName) {
  const buttonName = filterName + "List"
  const buttonFilter = document.getElementById(buttonName);
  console.log(buttonFilter)

  buttonFilter.setAttribute("class", "visible list-none absolute flex flex-col rounded-b-lg items-start pt-3.5 overflow-auto listBlocFilter max-h-80 z-1")
}

function closebuttonFilter(filterName) {
  const buttonName = filterName + "List"
  const buttonFilter = document.getElementById(buttonName);

  buttonFilter.setAttribute("class", "invisible w-0 h-0")
}