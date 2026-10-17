console.log("скрипт getTelLink в работе");

document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("advertisementTabl");
  if (!table) return;

  const rows = table.querySelectorAll("tbody tr");

  rows.forEach((row) => {
    // 7-й столбец — индекс 6 (нумерация с 0)
    const phoneCell = row.children[6];
    if (!phoneCell) return;

    let rawText = phoneCell.textContent.trim();
    if (!rawText) return;

    // Оставляем только цифры
    const digits = rawText.replace(/\D/g, "");

    // Нормализуем: если начинается с 8 и длина 11 → меняем на 7
    let normalized = digits;
    if (normalized.startsWith("8") && normalized.length === 11) {
      normalized = "7" + normalized.slice(1);
    }

    // Если получилось +7 и 11 цифр — делаем ссылку
    if (normalized.startsWith("7") && normalized.length === 11) {
      const link = document.createElement("a");
      link.href = "tel:+" + normalized;
      // Красивый формат: +7 (XXX) XXX-XX-XX
      link.textContent = `+7 (${normalized.slice(1, 4)}) ${normalized.slice(4, 7)}-${normalized.slice(7, 9)}-${normalized.slice(9)}`;
      phoneCell.innerHTML = ""; // очищаем ячейку
      phoneCell.appendChild(link); // вставляем ссылку
    } else {
      // Если формат непонятен — можно оставить как есть или пометить ошибкой
      // phoneCell.textContent = rawText;
    }
  });
});
