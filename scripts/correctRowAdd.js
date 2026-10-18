'use strict'
console.log('скрипт correctRowAdd в работе');

(function () {
    const modal = document.getElementById('editAdModal');
    const form = document.getElementById('editAdForm');
    const closeBtn = document.querySelector('.modal-close');

    const callsTable = document.getElementById('callsTabl');
    const adsTable = document.getElementById('advertisementTabl');

    if (!callsTable || !adsTable) return;

    // --- ВОССТАНОВЛЕНИЕ tbody ИЗ localStorage при загрузке ---
    const savedTbody = localStorage.getItem('#advertisementTabl');
    if (savedTbody) {
        try {
            const tbody = adsTable.querySelector('tbody');
            if (tbody) {
                tbody.innerHTML = savedTbody;
            }
        } catch (e) {
            console.warn('Не удалось восстановить tbody из localStorage', e);
        }
    }

    // Клик по ячейке «Адрес» в callsTabl
    callsTable.addEventListener('click', (e) => {
        const cell = e.target.closest('td');
        if (!cell) return;

        const thead = callsTable.querySelector('thead');
        const headers = Array.from(thead.querySelectorAll('th'));
        const addrColIndex = headers.findIndex(th => th.id === 'adFlat');
        const linkColIndex = headers.findIndex(th => th.id === 'city');

        if (addrColIndex === -1 || linkColIndex === -1) return;

        const row = cell.parentElement;
        const currentColIndex = Array.from(row.cells).indexOf(cell);

        if (currentColIndex !== addrColIndex) return;

        const linkCell = row.cells[linkColIndex];
        const linkAnchor = linkCell.querySelector('a');
        if (!linkAnchor) return;

        const targetLink = linkAnchor.href.trim();
        if (!targetLink) return;

        // Ищем строку в advertisementTabl по совпадению «Ссылка на объявление»
        const adRows = Array.from(adsTable.querySelectorAll('tbody tr'));
        let foundRow = null;
        let foundIndex = -1;

        adRows.forEach((r, idx) => {
            // Колонка «Ссылка на объявление» — индекс 9 (10-я колонка)
            const linkCellAd = r.cells[9];
            const anchorAd = linkCellAd.querySelector('a');
            if (anchorAd && anchorAd.href.trim() === targetLink) {
                foundRow = r;
                foundIndex = idx;
            }
        });

        if (!foundRow) {
            alert('Соответствующее объявление не найдено.');
            return;
        }

        document.getElementById('adRowIndex').value = foundIndex;
        document.getElementById('adId').value = foundRow.cells[0].textContent.trim();
        document.getElementById('adAuction').value = foundRow.cells[1].textContent.trim();
        document.getElementById('adNumber').value = foundRow.cells[2].textContent.trim();
        document.getElementById('adAddress').value = foundRow.cells[3].textContent.trim();
        document.getElementById('adPrice').value = foundRow.cells[4].textContent.trim();
        document.getElementById('adContact').value = foundRow.cells[5].textContent.trim();
        document.getElementById('adTel').value = foundRow.cells[6].innerHTML.trim(); // сохраняем HTML (ссылки)
        const relevanceText = foundRow.cells[8].textContent.trim();
        const relevanceSelect = document.getElementById('adRelevance');
        relevanceSelect.value = relevanceText || '';

        modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const index = parseInt(document.getElementById('adRowIndex').value, 10);
        if (index === -1) return;

        const adRows = adsTable.querySelectorAll('tbody tr');
        if (index < 0 || index >= adRows.length) return;

        const row = adRows[index];

        row.cells[0].textContent = document.getElementById('adId').value.trim();
        row.cells[1].textContent = document.getElementById('adAuction').value.trim();
        row.cells[2].textContent = document.getElementById('adNumber').value.trim();
        row.cells[3].textContent = document.getElementById('adAddress').value.trim();
        row.cells[4].textContent = document.getElementById('adPrice').value.trim();
        row.cells[5].textContent = document.getElementById('adContact').value.trim();
        row.cells[6].innerHTML = document.getElementById('adTel').value.trim(); // важно: innerHTML, чтобы сохранить ссылки
        row.cells[8].textContent = document.getElementById('adRelevance').value.trim();

        // --- СОХРАНЕНИЕ tbody.innerHTML В LOCALSTORAGE ---
        const tbody = adsTable.querySelector('tbody');
        if (tbody) {
            localStorage.setItem('#advertisementTabl', tbody.innerHTML);
        }

        modal.style.display = 'none';
        alert('Данные обновлены и сохранены в localStorage');
    });
})();