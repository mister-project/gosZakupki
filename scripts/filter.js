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

  filter.value = localStorage.getItem("topFilter");

  btnFilter.addEventListener("click", () => {
    funClearFilter(filter); // очистка фильтра по кнопке
  });

  //ПЕРВЫЙ ПОИСК СТРОК ПО ЗНАЧЕНИЮ ФИЛЬТРА ВЗЯТОМУ ИЗ localeStorage = Начало
  if (filter.value) {
    strTable.forEach((row) => {
      if (row.textContent.toUpperCase().includes(filter.value.toUpperCase())) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }
  //ПЕРВЫЙ ПОИСК СТРОК ПО ЗНАЧЕНИЮ ФИЛЬТРА ВЗЯТОМУ ИЗ localeStorage = Начало
  filter.addEventListener("input", (e) => {
    //     strTableNo.forEach((el) => {
    //         el.style.display = "none"
    //         console.log(el);
    //     })

    strTable.forEach((element) => {
      if (
        element.textContent.toUpperCase().includes(e.target.value.toUpperCase())
      ) {
        element.style.display = "";
      } else {
        element.style.display = "none";
      }

      localStorage.setItem("topFilter", e.target.value); // запись значения в LocaleStorage
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

try {
  getFilter("#filter", "#advertisementTabl");
} catch (error) {
  console.log("Не работает фильтр для таблицы Обьявлений");
}

// ФИЛЬТР ДЛЯ ТАБЛИЦЫ ЗАКУПОК
try {
  getFilter("#filter", "#auctionTabl");
} catch (error) {
  console.log("Не работает фильтр для таблицы ЗАКУПОК");
}

// ФИЛЬТР ДЛЯ ТАБЛИЦЫ ПОДБОРОК
try {
  getFilter("#filter", "#advertSelectTabl");
} catch (error) {
  console.log("Не работает фильтр для таблицы ЗАКУПОК");
}

//ФУНКЦИЯ ОЧИСТКИ  ФИЛЬТРА ПО КНОПКЕ
const funClearFilter = (el) => {
  console.log("функция очистки");
  el.value = "";
  location.reload();
  localStorage.removeItem("topFilter");
};
