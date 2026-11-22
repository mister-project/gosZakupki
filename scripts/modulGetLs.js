// ================================
// Мой охрененный эксперимент по модулю импорта-экспорта функций
// для записи tbody.innerHtml таблиц в localStorage

console.log("modulGetLs.js в работе");
export const funExpLs = (key) => {
  const adsTable = document.getElementById(key);
  const tbody = adsTable.querySelector("tbody");
  const allRows = tbody.querySelectorAll("tr");

  const keyNext = "#" + key;
  // console.log(tbody);
  if (key === "advertisementTabl") {
    console.log("совпадос");
    allRows.forEach((r) => {
      const allCells = r.cells;
      if (allCells[7]) {
        allCells[7].textContent = "";
      }
    });
  }
  localStorage.setItem(keyNext, tbody.innerHTML);

  console.log('отработка функции { funExpLs } from "./modulGetLs.js');
};
