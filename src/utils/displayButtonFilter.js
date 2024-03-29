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
  const searchName = filterName + "SearchZone";
  const searchFilter = document.getElementById(searchName);
  const activeName = filterName + "FilterActive";
  const activeFilter = document.getElementById(activeName);
  const buttonName = filterName + "List";
  const buttonFilter = document.getElementById(buttonName);

  searchFilter.setAttribute("class", "absolute z-10 px-3 py-2 bg-white w-44");
  activeFilter.setAttribute("class", " z-10 h-auto");
  buttonFilter.setAttribute(
    "class",
    "absolute top-28 visible list-none flex flex-col rounded-b-lg items-start overflow-auto listBlocFilter max-h-80 z-10"
  );

  const button = document.getElementById(filterName);
  button.classList.replace("rounded-lg", "rounded-t-lg");
}

function closebuttonFilter(filterName) {
  const searchName = filterName + "SearchZone";
  const searchFilter = document.getElementById(searchName);
  const activeName = filterName + "FilterActive";
  const activeFilter = document.getElementById(activeName);
  const buttonName = filterName + "List";
  const buttonFilter = document.getElementById(buttonName);

  buttonFilter.setAttribute("class", "invisible w-0 h-0");
  searchFilter.setAttribute("class", "invisible w-0 h-0");
  activeFilter.setAttribute("class", "invisible w-0 h-0");

  const button = document.getElementById(filterName);
  button.classList.replace("rounded-t-lg", "rounded-lg");
}
