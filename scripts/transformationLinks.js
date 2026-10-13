console.log("transformationLink - в работе");

document.addEventListener("DOMContentLoaded", () => {
  const tables = document.querySelectorAll("table");
  if (tables.length === 0) return;

  // Регулярка для поиска URL (простая, но покрывает типичные случаи)
  const urlRegex = /(https?:\/\/[^\s<>"{}|\\^`\[\]]+)/gi;

  tables.forEach((table) => {
    const cells = table.querySelectorAll("tbody tr td, thead tr th");

    cells.forEach((cell) => {
      const text = cell.textContent;
      if (!text) return;

      const matches = [...text.matchAll(urlRegex)];
      if (matches.length === 0) return;

      let newHtml = text;

      // Проходим с конца, чтобы замены не «сбивали» позиции подстрок
      matches.reverse().forEach((match) => {
        const fullUrl = match[0];
        const link = document.createElement("a");
        link.href = fullUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = fullUrl; // можно заменить на fullUrl, если хочешь видеть URL

        newHtml = newHtml.replace(fullUrl, link.outerHTML);
      });

      cell.innerHTML = newHtml;
    });
  });
});
