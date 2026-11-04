"use strict";
console.log("Sort.js работает");

const tableSort = (idTable) => {
  const table = document.querySelector(idTable);

  let sortedRows = Array.from(table.rows).slice(1);
  sortedRows.forEach((str) => {
    // str.insertCell(0);
    // str.cells[0].innerText = `${str.cells[1].innerText}${str.cells[2].innerText}`;
    // str.cells[0].style.display = 'none';
  });

  // sortedRows.sort((rowA, rowB,) => rowA.cells[0].innerText > rowB.cells[0].innerText);
  sortedRows.sort((rowA, rowB) =>
    rowA.cells[0].innerText < rowB.cells[0].innerText ? 1 : -1,
  );

  table.tBodies[0].append(...sortedRows);
};

try {
  tableSort("#advertisementTabl");
} catch (error) {
  console.log('"Таблица вещей" недоступна для сортировки');
}
