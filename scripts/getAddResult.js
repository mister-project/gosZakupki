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

  // Инициализация таблицы звонков, если её нет — создадим
  //   if (!callsTable) {
  //     const t = document.createElement("table");
  //     t.id = "callsTabl";
  //     t.innerHTML = `
  //       <thead>
  //         <tr>
  //           <th>№</th>
  //           <th>Дата</th>
  //           <th>Адрес</th>
  //           <th>Ссылка</th>
  //           <th>Результат</th>
  //         </tr>
  //       </thead>
  //       <tbody></tbody>
  //     `;
  //     // Вставьте callsTable туда, где нужно (например, после advTable)
  //     advTable.insertAdjacentElement("afterend", t);
  //   }

  const callsTbody = callsTable.querySelector("tbody");

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

  // Добавляем кнопки-иконки рядом с телефонами (7-й столбец, индекс 6)
  const rows = advTable.querySelectorAll("tbody tr");
  rows.forEach((row, idx) => {
    const phoneCellNew = row.children[6];
    if (!phoneCellNew) return;

    const btnCall = document.createElement("span");
    btnCall.className = "add-call-btn";
    btnCall.title = "Добавить звонок";
    btnCall.textContent = "+"; // можно заменить на SVG иконку

    btnCall.onclick = () => {
      // Заполняем форму данными из текущей строки
      fNumber.value = ""; // не показываем номер, он будет присвоен после вставки
      const today = new Date().toISOString().split("T")[0];
      fDate.value = today;

      // Адрес: 4-я ячейка (индекс 3)
      const addressCell = row.cells[3];
      fAddress.value = addressCell ? addressCell.textContent.trim() : "";

      // Ссылка: 9-я ячейка (индекс 8)
      const linkCell = row.cells[8];
      let linkHref = "";
      if (linkCell && linkCell.querySelector("a")) {
        linkHref = linkCell.querySelector("a").href;
      } else {
        linkHref = linkCell ? linkCell.textContent.trim() : "";
      }
      fLink.value = linkHref;

      fResult.value = "";

      modal.style.display = "flex";
    };

    phoneCellNew.appendChild(btnCall);
  });

  // Закрытие модального окна
  btnClose.onclick = () => (modal.style.display = "none");
  modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };

  // Отправка формы
  form.onsubmit = (e) => {
    e.preventDefault();

    const number = getNextCallNumber();
    const date = fDate.value;
    const address = fAddress.value;
    const link = fLink.value;
    const result = fResult.value;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${number}</td>
      <td>${date}</td>
      <td>${address}</td>
      <td><a href="${link}" target="_blank" rel="noopener noreferrer">ссылка</a></td>
      <td>${result}</td>
    `;

    callsTbody.appendChild(tr);
    sortCallsByDate(); // сортируем, чтобы новые были сверху

    modal.style.display = "none";
    form.reset();
  };
});
document
  .querySelector("#shortLinksAdvertisements")
  .addEventListener("click", () => console.log("змяк"));
