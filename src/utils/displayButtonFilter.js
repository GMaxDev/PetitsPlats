export function displaybuttonFilter(filterName) {
  const buttonName = filterName + "List"
  console.log(buttonName)
  const buttonFilter = document.getElementById(buttonName);
  buttonFilter.setAttribute("class", "visible flex flex-col rounded-b-lg items-start pt-3.5 overflow-auto listBlocFilter h-80")
}

export function closebuttonFilter(filterName) {
  const buttonFilter = document.getElementById(filterName);
  buttonFilter.style.visibility = "hidden";
}