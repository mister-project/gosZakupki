"use strict";
console.log("expotToJson copy в работе");

document
  .getElementById("downloadBtnJson")
  ?.addEventListener("click", function () {
    const tables = document.querySelectorAll("table");
    const jsonData = {};

    tables.forEach((table) => {
      const tableId = table.id;
      if (!tableId) return;

      // Берём текст заголовков, а не id
      const headers = Array.from(table.querySelectorAll("thead th")).map((th) =>
        th.textContent.trim(),
      );

      const rows = Array.from(table.querySelectorAll("tbody tr"));

      jsonData[tableId] = rows.map((row) => {
        const cells = Array.from(row.querySelectorAll("td"));
        const rowData = {};

        headers.forEach((header, index) => {
          const cell = cells[index];
          if (!cell) {
            rowData[header] = "";
            return;
          }

          // Клонируем ячейку, удаляем кнопки, берём чистый текст
          const clone = cell.cloneNode(true);
          clone.querySelectorAll(".add-call-btn").forEach((el) => el.remove());
          rowData[header] = clone.innerText.trim();
        });

        return rowData;
      });
    });

    const jsonString = JSON.stringify(jsonData, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "tables_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
