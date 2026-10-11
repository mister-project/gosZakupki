console.log("modalWindow в работе");

// ФУНКЦИЯ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА И ДОБАВЛЕНИЯ НОВОЙ СТРОКИ В ТАБЛИЦУ

const modalWindow = {};
const localStor = (modalWindow) => {
  const container = document.querySelector(modalWindow.containerId);
  let table = container.querySelector(modalWindow.tableId);
  const tBody = table.querySelector("tBody");
  tBody.innerHTML = localStorage.getItem(modalWindow.tableId);
};
const getModalWindow = (modalWindow) => {
  const container = document.querySelector(modalWindow.containerId);
  console.log(container);
  let table = container.querySelector(modalWindow.tableId);
  const openModalBtn = container.querySelector(modalWindow.modalButtonId); // Кнопка открытия модального окна
  const modal = document.querySelector(modalWindow.modalId); //само модальное окно
  const closeModalBtn = modal.getElementsByClassName("close")[0]; //кнопка закрытия модального окна
  let form = modal.querySelector("#form");
  const buttonSubmit = modal.querySelector("#submit");
  const tBody = table.querySelector("tBody");

  //ФОРМИРОВАНИЕ ID ЗАПИСИ ЧЕРЕЗ МЕТКУ ВРЕМЕНИ
  const now = new Date();
  let idRow =
    `${now.getFullYear()}`.slice(-2) +
    `0${now.getMonth() + 1}`.slice(-2) +
    `0${now.getDate()}`.slice(-2) +
    `0${now.getHours()}`.slice(-2) +
    `0${now.getMinutes()}`.slice(-2) +
    `0${now.getSeconds()}`.slice(-2);

  //Функция для ФОРМИРОВАНИя строк выпадающего СПИСКА
  const getSelect = () => {
    // console.log(document.querySelector("#points"));
    document
      .querySelector(modalWindow.idTableSelect)
      .querySelector("tbody")
      .querySelectorAll("tr")
      .forEach((str) => {
        const option = document.createElement("option");

        // selectContainer.appendChild(option);
        option.innerText =
          str.querySelectorAll("td")[modalWindow.idColSelect].innerText;
        option.value =
          str.querySelectorAll("td")[modalWindow.idColSelectValue].innerText;

        document.querySelector("#points").appendChild(option);
        console.log(option.innerText);
      });
  };
  //ОТКРЫТИЕ МОДАЛЬНОГО ОКНА

  modal.style.display = "block";

  // Переброска записи из формы в таблицу
  container.addEventListener("click", (event) => {
    // ПОЛУЧАЕМ НУЖНУЮ СТРАНИЦУ ЧЕРЕЗ ДЕЛЕГИРОВАНИЕ
    if (event.target.closest(modalWindow.containerId)) {
      addStr(table); // ЗАПУСКАЕМ ФУНКЦИЮ ДОБАВЛЕНИЯ СТРОК В НУЖНОЙ ТАБЛИЦЕ
      // ПО ДРУГОМУ НЕ РАБОТАЕТ
    }
  });
  //ФУНКЦИЯ ДОБАВЛЕНИЯ СТРОКИ В ТАБЛИЦУ
  const addStr = (tabl) => {
    // console.log(tabl)
    tabl.querySelectorAll("th").forEach((th, index) => {
      //  Добавление в форму модального окна всех остальных полей
      const div = document.createElement("div");
      const input = document.createElement("input");
      const select = document.createElement("select");

      form.appendChild(div);
      input.setAttribute("type", "text");
      if (index === modalWindow.columnIdStr) {
        input.value = idRow;
        input.setAttribute("placeholder", th.textContent);
        div.appendChild(input);
      }
      if (index === modalWindow.idInputSelect) {
        // ввод окна поиска из выпадающего списка
        // const inputElement = document.createElement("input");
        // div.appendChild(inputElement);
        // // Устанавливаем атрибуты
        // inputElement.type = "text";
        // inputElement.id = "searchSelect";
        // inputElement.placeholder = "Начните вводить...";
        // form.appendChild(inputElement);

        //создаем select для выпадающего списка и кладем в нужное поле
        select.setAttribute("id", "points");
        select.setAttribute("size", "5");
        div.appendChild(select);
        getSelect(select);
      } else {
        input.setAttribute("placeholder", th.textContent);
        div.appendChild(input);
      }
    });

    // Слушаем форму и поля на изменение полей для добавления идентификаторов из других таблиц

    // form.addEventListener('change', () => {
    //     console.log(form.querySelectorAll('select'));

    // })
    //Функция вставки в таблицу ID выбранного селекта - запускается при САБМИТЕ ФОРМЫ
    const insertId = (arg, val) => {
      const cells = form.querySelectorAll("input, textarea, select");
      console.log(cells);

      cells.forEach((el, index) => {
        if (index === arg + 1) {
          el.value = val;
          console.log(el.value);
        }
      });
    };
    //Добавление строк в таблицу
    buttonSubmit.addEventListener("click", (btn) => {
      console.log("жмяк");
      const newRow = tabl.querySelector("tbody").insertRow();
      const cells = form.querySelectorAll("input, textarea, select");

      for (let i = 0; i < cells.length; i++) {
        const newCell = newRow.insertCell(i);
        if (cells[i].localName === "select") {
          // newCell.textContent = cells[i].textContent
          newCell.textContent = cells[i].options[cells[i].selectedIndex].text;
          insertId(i, cells[i].value);
        } else {
          newCell.textContent = cells[i].value;
        }
      }
      // debugger;

      closeModal(modalWindow);
    });
  };

  tBody.innerHTML = localStorage.getItem(modalWindow.tableId);

  // Закрытие модального окна отправка в локальное хранилище нового экземпляра таблицы
  // И ПЕРЕЗАГРУЗКА СТРАНИЦЫ

  closeModalBtn.addEventListener("click", () => {
    closeModal(modalWindow);
  });

  const closeModal = (modalWindow) => {
    modal.style.display = "none";
    localStorage.setItem(modalWindow.tableId, tBody.innerHTML);
    form.querySelectorAll("input").forEach((input) => {
      input.remove();
    });
    location.reload(); // Перезагрузка страницы - еСЛИ ЭТОГО НЕ СДЕЛАТЬ, БЕЗ ПЕРЕГРУЗКИ, ДОБАВЛЕНИЕ БУДЕТ В ОБЕ ТАБЛИЦЫ
  };
};

// Подгрузка таблицы СО ЗВОНКАМИ --- Начало
try {
  document.querySelector("#openModalCalls").addEventListener("click", () => {
    getModalWindow(callsBtn);
  });
  const callsBtn = {
    columnIdStr: 0, //Номер столбца с ID кодом
    containerId: "#callsContainer", //ИД контейнера
    tableId: "#callsTabl", //'#thingsAndPlases', //ИД таблицы, в которую будем заносить данные
    modalButtonId: "#openModalCalls", //'#openModal',//ИД кнопки открытия мобильного окна
    modalId: "#modal", //Ид модального окна
    // buttonSubmitId: '#submitPlaces', // класс кнопки внесения данных
    idInputSelect: 2, //номер поля в форме, куда вставляется вып. список
    idTableSelect: "#advertisementTabl", //имя таблицы, содержащей данные для вып. списка
    idColSelect: 3, // номер столбца таблицы, содержащего данные для вып.  списка
    idColSelectValue: 2, // номер столбца в таблице, откуда берем ID (value) вставляемого значения
  };

  localStor(callsBtn); //Запуск функции загрузки данныех из  LS
} catch (error) {
  console.log("неполадочки в таблице Объявлений");
}
// Подгрузка таблицы СО ЗВОНКАМИ --- оКОНЧАНИЕ

// Подгрузка таблицы по Объявлениям продажи квартир --- Начало
try {
  document
    .querySelector("#openModalAdvertisements")
    .addEventListener("click", () => {
      console.log("жмяк");

      getModalWindow(flatAd);
    });
  const flatAd = {
    columnIdStr: 0, //Номер столбца с ID кодом
    containerId: "#flatSale", //ИД контейнера
    tableId: "#advertisementTabl", //'#thingsAndPlases', //ИД таблицы, в которую будем заносить данные
    modalButtonId: "#openModalAdvertisements", //'#openModal',//ИД кнопки открытия мобильного окна
    modalId: "#modal", //Ид модального окна
    // buttonSubmitId: '#submitPlaces', // класс кнопки внесения данных
    idInputSelect: 1, //номер поля в форме, куда вставляется вып. список
    idTableSelect: "#auctionTabl", //имя таблицы, содержащей данные для вып. списка
    idColSelect: 7, // номер столбца таблицы, содержащего данные для вып.  списка
    idColSelectValue: 0, // номер столбца в таблице, откуда берем ID (value) вставляемого значения
  };

  localStor(flatAd); //Запуск функции загрузки данныех из  LS
} catch (error) {
  console.log("неполадочки в таблице Объявлений");
}
// Подгрузка таблицы по Объявлениям продажи квартир --- оКОНЧАНИЕ

//Подзагрузка таблицы по Заявкам -- Начало
try {
  document.querySelector("#openModalZayavki").addEventListener("click", () => {
    console.log("кнопка");
    getModalWindow(zayavki);
  });
  const zayavki = {
    columnIdStr: 0, //Номер столбца с ID кодом
    containerId: "#auctions", //ИД контейнера
    tableId: "#auctionTabl", //'#thingsAndPlases', //ИД таблицы, в которую будем заносить данные
    modalButtonId: "#openModalZayavki", //'#openModal',//ИД кнопки открытия модального окна
    modalId: "#modal", //Ид модального окна
    // buttonSubmitId: '#submitPlaces', // класс кнопки внесения данных
    // idTableSelect: '#flat', //имя таблицы, содержащей данные для вып. списка
    // idColSelect: 1 // номер столбца, содержащего данные для вып.  списка
  };

  localStor(zayavki); //Запуск функции загрузки данныех из  LS
} catch (error) {
  console.log("неподгружается таблица заявок");
}
