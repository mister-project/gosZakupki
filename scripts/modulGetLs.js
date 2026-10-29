// ================================
// Мой охрененный эксперимент по модулю импорта-экспорта функций
// для записи tbody.innerHtml таблиц в localStorage

console.log("modulGetLs.js в работе");
export const funExpLs = (key, dataLs) => {
  localStorage.setItem(key, dataLs);
};
