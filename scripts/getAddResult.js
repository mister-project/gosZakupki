(function () {
  const modal = document.getElementById("callsModal");
  const form = document.getElementById("callsForm");
  const btnClose = document.getElementById("callsModalClose");

  // Элементы формы
  const fNumber = document.getElementById("callNumber");
  const fDate = document.getElementById("callDate");
  const fAddress = document.getElementById("callAddress");
  const fLink = document.getElementById("callLink");
  const fResult = document.getElementById("callResult");

  // Таблицы
  const advTable = document.getElementById("advertisementTabl");
  const callsTable = document.getElementById("callsTabl");

  if (!advTable) return; // если нет исходной таблицы — ничего не делаем

  const callsTbody = callsTable ? callsTable.querySelector("tbody") : null;
  if (!callsTbody) return;

  // Функция: получить текущий максимальный номер (для автонумерации)
  function getNextCallNumber() {
    let max = 0;
    const rows = callsTbody.querySelectorAll("tr");
    rows.forEach((r) => {
      const numCell = r.cells[0];
      const n = parseInt(numCell.textContent.trim(), 10);
      if (!isNaN(n) && n > max) max = n;
    });
    return max + 1;
  }

  // Функция: сортировка строк по дате (новые сверху)
  function sortCallsByDate() {
    const rows = Array.from(callsTbody.querySelectorAll("tr"));
    rows.sort((a, b) => {
      const da = new Date(a.cells[1].textContent);
      const db = new Date(b.cells[1].textContent);
      return db - da; // обратный порядок
    });
    rows.forEach((r) => callsTbody.appendChild(r));
  }

  // Добавляем кнопки-иконки в 8-й столбец (индекс 7)
  const rows = advTable.querySelectorAll("tbody tr");
  rows.forEach((row) => {
    const cell = row.children[7]; // индекс 7 = 8‑я ячейка
    if (!cell) return;

    const btnCall = document.createElement("img");
    btnCall.className = "add-call-btn";
    btnCall.title = "Добавить звонок";
    // btnCall.textContent = "+"; // можно заменить на SVG иконку
    btnCall.src = "img/call.png";

    btnCall.onclick = () => {
      // Заполняем форму данными из текущей строки
      fNumber.value = ""; // не показываем номер, он будет присвоен после вставки
      const today = new Date().toISOString().split("T")[0];
      fDate.value = today;

      // Адрес: 4‑я ячейка (индекс 3)
      const addressCell = row.cells[3];
      fAddress.value = addressCell ? addressCell.textContent.trim() : "";

      // Ссылка: 10‑я ячейка (индекс 9)
      const linkCell = row.cells[9];
      let linkHref = "";
      if (linkCell && linkCell.querySelector("a")) {
        linkHref = linkCell.querySelector("a").href;
      } else {
        linkHref = linkCell ? linkCell.textContent.trim() : "";
      }
      fLink.value = linkHref;

      fResult.value = "";

      if (modal) modal.style.display = "flex";
    };

    cell.appendChild(btnCall);
  });

  // Закрытие модального окна
  if (btnClose) {
    btnClose.onclick = () => {
      if (modal) modal.style.display = "none";
    };
  }
  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) modal.style.display = "none";
    };
  }

  // Отправка формы
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();

      const number = getNextCallNumber();
      const date = fDate.value;
      const address = fAddress.value;
      const link = fLink.value;
      const result = fResult.value;
      // const tbody = document.querySelector("#callsTabl").querySelector("tBody");
      // // let table = container.querySelector(modalWindow.tableId);
      // //   const tBody = table.querySelector("tBody");
      // console.log(tbody);

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${number}</td>
        <td>${date}</td>
        <td>${address}</td>
        <td><a href="${link}" target="_blank" rel="noopener noreferrer">${link}</a></td>
        <td>${result}</td>
      `;

      callsTbody.appendChild(tr);
      sortCallsByDate(); // сортируем, чтобы новые были сверху

      if (modal) modal.style.display = "none";
      form.reset();

      localStorage.setItem("#callsTabl", callsTbody.innerHTML);
    };
  }
})();

document
  .querySelector("#shortLinksAdvertisements")
  ?.addEventListener("click", () => console.log("змяк"));
