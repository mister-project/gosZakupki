"use strict";
console.log("expotToJson в работе");

document
  .getElementById("downloadBtnJson")
  .addEventListener("click", function () {
    const tables = document.querySelectorAll("table");
    const jsonData = {};

    tables.forEach((table) => {
      const tableId = table.id;
      const headers = Array.from(table.querySelectorAll("thead th")).map(
        (th) => th.id
      );
      const rows = Array.from(table.querySelectorAll("tbody tr"));

      jsonData[tableId] = rows.map((row) => {
        const cells = Array.from(row.querySelectorAll("td"));
        const rowData = {};
        headers.forEach((header, index) => {
          rowData[header] = cells[index] ? cells[index].innerText : "";
        });
        return rowData;
      });
    });

    const jsonString = JSON.stringify(jsonData, null, 2);

    // Создание ссылки для скачивания
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "tables_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
