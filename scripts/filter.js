"use strict";
console.log("filtr.js в работе");

const getFilter = (idInput, idTable) => {
  const btnFilter = document.querySelector("#btnFilter");

  const filter = document.querySelector(idInput);
  let strTable = document
    .querySelector(idTable)
    .querySelector("tbody")
    .querySelectorAll("tr");

  // console.log(strTable);
  // let strTableNo = document.querySelectorAll('.trNoFilter')
  // // console.log(document.querySelector('span'))

  filter.addEventListener("input", (e) => {
    //     strTableNo.forEach((el) => {
    //         el.style.display = "none"
    //         console.log(el);
    //     })
    btnFilter.addEventListener("click", () => {
      funClearFilter(e);
    });
    strTable.forEach((element) => {
      if (
        element.textContent.toUpperCase().includes(e.target.value.toUpperCase())
      ) {
        element.style.display = "";
      } else {
        element.style.display = "none";
      }
    });
  });
};
// Фильтр для строк таблицы звонков
try {
  getFilter("#filter", "#callsTabl");
} catch (error) {
  console.log("Не работает фильтр для таблицы ЗВОНКОВ");
}
// auctionTabl

// ФИЛЬТР ДЛЯ ТАБЛИЦЫ ОБЪЯВЛЕНИЙ
// Фильтр для строк таблицы вещей
try {
  getFilter("#filter", "#advertisementTabl");
} catch (error) {
  console.log("Не работает фильтр для таблицы Обьявлений");
}

const funClearFilter = (el) => {
  console.log("функция очистки");
  el.target.value = "";
  location.reload();
};
