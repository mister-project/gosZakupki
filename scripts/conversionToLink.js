console.log("conversionToLink.js подключен");

// Функция для преобразования текста в ссылку
function convertTextToLinks(param) {
  // Получаем таблицу по идентификатору
  const table = document.getElementById(param);
  // Перебираем все строки таблицы, начиная со второй (игнорируя заголовок)
  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    // Перебираем все ячейки в строке
    for (let j = 0; j < row.cells.length; j++) {
      const cell = row.cells[j];
      const cellContent = cell.innerText.trim(); // Получаем текст ячейки
      // Проверяем, содержит ли текст 'http'
      if (cellContent.includes("http")) {
        // Создаем ссылку
        const link = document.createElement("a");
        link.href = cellContent; // Устанавливаем адрес ссылки
        link.target = "_blank"; // Открывать в новой вкладке
        link.textContent = fullUrl; // Устанавливаем текст ссылки

        // Очищаем содержимое ячейки и добавляем ссылку
        cell.innerHTML = "";
        cell.appendChild(link);
      }
    }
  }
}

// Сокращение ссылок Таблицы с ЗАЯВКАМИ
try {
  document.querySelector("#shortLinksZayavki").addEventListener("click", () => {
    convertTextToLinks("auctionTabl");
  });
} catch (error) {}

//
// Сокращение ссылок Таблицы с Обьявлениями
try {
  document
    .querySelector("#shortLinksAdvertisements")
    .addEventListener("click", () => {
      convertTextToLinks("advertisementTabl");
    });
} catch (error) {}
