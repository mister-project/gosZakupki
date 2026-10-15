document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("advertisementTabl");
  if (!table) return;

  const tbody = table.querySelector("tbody");
  if (!tbody) return;

  const rows = tbody.querySelectorAll("tr");

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    // 6‑й столбец — это индекс 5 (считаем с 0)
    if (cells.length < 6) return;

    const value = cells[5].textContent.trim();
    const lower = value.toLowerCase();

    // Убираем старые классы перед назначением новых
    row.classList.remove("row-no", "row-yes");

    if (lower.includes("нет")) {
      row.classList.add("row-no");
    } else if (lower.includes("да")) {
      row.classList.add("row-yes");
    }
    // Если значение не «да» и не «нет», строка остаётся без спеццвета
  });
});
