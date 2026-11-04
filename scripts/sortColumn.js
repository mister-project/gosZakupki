console.log("скрипт сортаировки по столбцам sortColumn в работе");

/**
 * Универсальная функция сортировки HTML таблицы
 * @param {string} tableId - ID таблицы
 * @param {string} columnSelectId - ID select для выбора столбца
 * @param {string} orderSelectId - ID select для выбора направления сортировки
 */
function initTableSort(tableId, columnSelectId, orderSelectId) {
  const table = document.getElementById(tableId);
  const columnSelect = document.getElementById(columnSelectId);
  const orderSelect = document.getElementById(orderSelectId);

  if (!table || !columnSelect || !orderSelect) {
    console.error("Не найдены один или несколько элементов:", {
      tableId,
      columnSelectId,
      orderSelectId,
    });
    return;
  }

  // Заполняем select столбцов значениями из <thead>
  const headers = table.querySelectorAll("thead th");
  headers.forEach((th, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = th.textContent.trim();
    columnSelect.appendChild(option);
  });

  // Нормализация строки: убираем пробелы, тире, знаки препинания, приводим к нижнему регистру
  const normalize = (str) => {
    return str
      .toLowerCase()
      .replace(/[\s\-–—_,.;:!?'"«»()\[\]{}\/\\|@#$%^&*+=~`<>]/g, "");
  };

  // Определение типа значения для корректной сортировки
  const detectType = (value) => {
    const trimmed = value.trim();
    if (trimmed === "") return "empty";
    // Число (включая отрицательные и десятичные)
    if (/^-?\d+([.,]\d+)?$/.test(trimmed)) return "number";
    // Дата в форматах DD.MM.YYYY, YYYY-MM-DD, DD/MM/YYYY
    if (/^\d{1,4}[-./]\d{1,2}[-./]\d{1,4}$/.test(trimmed)) return "date";
    return "string";
  };

  const parseDate = (str) => {
    const parts = str.trim().split(/[-./]/);
    if (parts[0].length === 4) {
      return new Date(parts[0], parts[1] - 1, parts[2]).getTime();
    }
    return new Date(parts[2], parts[1] - 1, parts[0]).getTime();
  };

  const getCellValue = (row, colIndex) => {
    const cell = row.children[colIndex];
    return cell ? cell.textContent.trim() : "";
  };

  // Сортировка
  const sortTable = () => {
    const tbody = table.querySelector("tbody");
    if (!tbody) return;

    const colIndex = parseInt(columnSelect.value, 10);
    const direction = orderSelect.value;

    if (isNaN(colIndex)) return;

    const rows = Array.from(tbody.querySelectorAll("tr"));

    // Определяем тип по первому непустому значению
    let type = "string";
    for (const row of rows) {
      const v = getCellValue(row, colIndex);
      if (v !== "") {
        type = detectType(v);
        break;
      }
    }

    const compare = (a, b) => {
      const aRaw = getCellValue(a, colIndex);
      const bRaw = getCellValue(b, colIndex);

      // Пустые значения всегда в конце
      if (aRaw === "" && bRaw === "") return 0;
      if (aRaw === "") return 1;
      if (bRaw === "") return -1;

      let result;
      if (type === "number") {
        const aNum = parseFloat(aRaw.replace(",", "."));
        const bNum = parseFloat(bRaw.replace(",", "."));
        result = aNum - bNum;
      } else if (type === "date") {
        result = parseDate(aRaw) - parseDate(bRaw);
      } else {
        // Строковая сортировка с нормализацией
        const aNorm = normalize(aRaw);
        const bNorm = normalize(bRaw);
        result = aNorm.localeCompare(bNorm, "ru", {
          numeric: true,
          sensitivity: "base",
        });
      }

      return direction === "desc" ? -result : result;
    };

    rows.sort(compare);
    rows.forEach((row) => tbody.appendChild(row));
  };

  columnSelect.addEventListener("change", sortTable);
  orderSelect.addEventListener("change", sortTable);
}

// Универсальность — достаточно передать 3 ID, скрипт сам прочитает заголовки из <thead> и заполнит первый <select>.

// Автоопределение типа данных — числа (включая десятичные и отрицательные), даты (DD.MM.YYYY, YYYY-MM-DD, DD/MM/YYYY) и строки сортируются корректно.

// Пустые ячейки — всегда уходят в конец независимо от направления сортировки.

// Строковая сортировка — используется localeCompare с локалью 'ru' и numeric: true, что даёт правильный порядок для кириллицы и чисел внутри строк ("Товар 2" < "Товар 10").

// Работает с <tbody> — заголовок таблицы не затрагивается.
// Функция normalize(str) — приводит строку к «каноническому» виду для сравнения:

// .toLowerCase() — игнорирование регистра

// .replace(/[\s\-–—_,.;:!?'"«»()\[\]{}\/\\|@#$%^&*+=~<>]/g, '')` — удаляет:

// все виды пробелов (\s — пробел, таб, неразрывный пробел и т.д.)

// тире и дефисы разных видов (-, – en-dash, — em-dash, _ подчёркивание)

// знаки препинания: . , ; : ! ? ' "

// кавычки-ёлочки « »

// скобки ( ) [ ] { }

// слэши и обратные слэши / \

// прочие символы | @ # $ % ^ & * + = ~ \ < >`

// Сравнение по нормализованным строкам — в блоке else (строковый тип) вызывается normalize() перед localeCompare. Это значит, что:

// "Иван-Петров" и "иван петров" будут считаться равными

// "Товар №1" и "товар 1" — равны

// "ООО «Ромашка»" и "ООО Ромашка" — равны

// Числа и даты по-прежнему сортируются как числа/даты — нормализация к ним не применяется, чтобы не испортить числовые значения (например, -5 не превратилось в 5).

// Пустые ячейки остаются в конце — проверка === '' выполняется до нормализации.

// numeric: true в localeCompare сохранён — это позволяет корректно сортировать "Товар 2" < "Товар 10" даже после удаления пробелов.

// Пример использования:
// initTableSort('myTable', 'columnSelect', 'orderSelect');

// СОРТИРОВКА ТАБЛИЦЫ ОБЬЯВЛЕНИЙ
try {
  initTableSort("advertisementTabl", "columnSelect", "orderSelect");
} catch (error) {}
