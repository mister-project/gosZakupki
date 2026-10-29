console.log("modulHideRows в работе");
// модуль предназначен для:
// 1 создания чек - боксов в строках таблиц
// 2. фиксации изменений этих чек - боксов и скрытия/открытия строк при изменении состояния чек-бокса
// 3. Сохранении tbody.innerHtml таблиц в localeStorage
// 4. Открытии скрытых срок при активации чек-бокса "Показать скрытое ..." вверху каждой таблицы
import { funExpLs } from "./modulGetLs.js";
// Реализация п. 1  создания чек - боксов в строках таблиц
//1.1 Слушаем клик по кнопке с ID = createCheсkBox

// Шаг 0 - создаеем общую функцию для всего модуля
const getAllCheckbox = () => {
  // 0.1  создаю внешнюю переменную для получения массива таблиц
  const getTable = document.querySelectorAll("table");
  // 02. создаю внешнюю функцию для парсинга каждой таблицы и получения нужных переменных
  const parcingTable = (onceTable) => {
    //03. Получаю массив строк каждой таблицы
    const rowsTable = onceTable.querySelector("tbody").querySelectorAll("tr");

    // 04. Перебираю строки для поиска последних ячеек
    rowsTable.forEach((row) => {
      makeCheckboxCell(row);
    });
  };
  // 0.3 создаю общий цикл для отправки каждой таблицы на парсинг
  getTable.forEach((onceTable) => {
    parcingTable(onceTable);
  });

  //8. Функция - затычка для считывания значения последней ячейки и скрытия стпроки
  function makeCheckboxCell(lonlyRow) {
    const lastCell = lonlyRow.cells[lonlyRow.cells.length - 1];
    if (lastCell.textContent === "0") {
      // console.log(lastCell);
      lonlyRow.style.display = "none";
      lonlyRow.classList.add("hidden-row");
    }
  }

  // const lastRow = table.rows[table.rows.length - 1]
  //Шаг1. Это вспомогательная кнопака для запуска шага 1
  //   document.querySelector("#createCheсkBox").addEventListener("click", () => {
  //     makeCheckboxCell();
  //   });
  //1.2 Создаем чек-бокс
  //   function makeCheckboxCell(lonlyRow) {
  //     const lastCell = lonlyRow.cells[lonlyRow.cells.length - 1];
  //     lastCell.className = "checkbox-cell";
  //     const cb = document.createElement("input");

  //     cb.type = "checkbox";
  //     //   cb.checked = isHidden;
  //     cb.title = "Показать/скрыть";
  //     //   cb.addEventListener("change", () => onChange(cb.checked));
  //     lastCell.appendChild(cb);
  //     console.log(lastCell);

  //     return lastCell;
  //   }
  // Реализация п.3 Сохранении tbody.innerHtml таблиц в localeStorage
  const funSaveToLs = (getTable) => {
    // 3.1 - получаю кнопку отправки данных в LS
    const btnSaveToLs = document.querySelector("#saveToLs");
    // 3.2  создаю внешнюю переменную для получения массива таблиц

    //3.3  создаю событие при нажати на кпопку id=saveToLs
    btnSaveToLs.addEventListener("click", () => {
      console.log("пумс");

      // 3.4 Через перебор получаем id таблиц для ключей объектов в LS и tbody.innerHML
      getTable.forEach((table) => {
        const key = table.id; //3.4.1 Получил ключи таблиц
        const tbodyInnerHtml = table.querySelector("tbody").innerHTML;

        //3.5 и Отправляем tbody.innerHML каждой таблицы в Localstorage через импортируемую функцию внешнего модуля
        funExpLs(key, tbodyInnerHtml);
      });
    });
  };

  //   funSaveToLs(getTable);
};
getAllCheckbox(); // Отн. к шагу 0 - запуск всего модуля как отдельной функции
