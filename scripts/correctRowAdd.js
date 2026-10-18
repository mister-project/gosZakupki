'use strict'
console.log('скрипт correctRowAdd в работе');

(function () {
    const modal = document.getElementById('adEditModal');
    const form = document.getElementById('adEditForm');
    const closeBtn = document.querySelector('.ad-edit-close');

    const callsTable = document.getElementById('callsTabl');
    const adsTable = document.getElementById('advertisementTabl');

    if (!adsTable) return;

    // --- ВОССТАНОВЛЕНИЕ tbody ИЗ localStorage ---
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

    function openEditModalForRow(row, index) {
        const cells = row.cells;

        document.getElementById('adRowIndex').value = index;
        document.getElementById('adId').value = cells[0].textContent.trim();
        document.getElementById('adAuction').value = cells[1].textContent.trim();
        document.getElementById('adNumber').value = cells[2].textContent.trim();
        document.getElementById('adAddress').value = cells[3].textContent.trim();
        document.getElementById('adPrice').value = cells[4].textContent.trim();
        document.getElementById('adContact').value = cells[5].textContent.trim();

        // Телефон: только текст
        document.getElementById('adTel').value = cells[6].textContent.trim();

        // Актуальность: только текст
        document.getElementById('adRelevance').value = cells[8].textContent.trim();

        modal.style.display = 'flex';
    }

    function findAndOpenByLink(targetLink) {
        if (!targetLink) return;

        const adRows = Array.from(adsTable.querySelectorAll('tbody tr'));
        let foundRow = null;
        let foundIndex = -1;

        adRows.forEach((r, idx) => {
            // Колонка «Ссылка на объявление» — индекс 9
            const linkCell = r.cells[9];
            const anchor = linkCell.querySelector('a');
            if (anchor && anchor.href.trim() === targetLink) {
                foundRow = r;
                foundIndex = idx;
            }
        });

        if (foundRow) {
            openEditModalForRow(foundRow, foundIndex);
        } else {
            alert('Соответствующее объявление не найдено.');
        }
    }

    // Клик по «Адрес» в callsTabl
    if (callsTable) {
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
            findAndOpenByLink(targetLink);
        });
    }

    // Клик по «Адрес Квартиры» в advertisementTabl
    adsTable.addEventListener('click', (e) => {
        const cell = e.target.closest('td');
        if (!cell) return;

        const thead = adsTable.querySelector('thead');
        const headers = Array.from(thead.querySelectorAll('th'));
        const addrColIndex = headers.findIndex(th => th.id === 'adressOfFlat');

        if (addrColIndex === -1) return;

        const row = cell.parentElement;
        const currentColIndex = Array.from(row.cells).indexOf(cell);
        if (currentColIndex !== addrColIndex) return;

        const index = Array.from(adsTable.querySelectorAll('tbody tr')).indexOf(row);
        openEditModalForRow(row, index);
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
        const cells = row.cells;

        // Заполняем текущую строку данными из формы
        cells[0].textContent = document.getElementById('adId').value.trim();
        cells[1].textContent = document.getElementById('adAuction').value.trim();
        cells[2].textContent = document.getElementById('adNumber').value.trim();
        cells[3].textContent = document.getElementById('adAddress').value.trim();
        cells[4].textContent = document.getElementById('adPrice').value.trim();
        cells[5].textContent = document.getElementById('adContact').value.trim();

        const telValue = document.getElementById('adTel').value.trim();
        cells[6].textContent = telValue;

        cells[8].textContent = document.getElementById('adRelevance').value.trim();

        // --- ОЧИСТКА СТОЛБЦА «ДЕЙСТВИЕ» (индекс 7) ВО ВСЕЙ ТАБЛИЦЕ ---
        const allRows = adsTable.querySelectorAll('tbody tr');
        allRows.forEach(r => {
            const allCells = r.cells;
            if (allCells[7]) {
                allCells[7].textContent = '';
            }
        });

        // Сохранение tbody.innerHTML в localStorage
        const tbody = adsTable.querySelector('tbody');
        if (tbody) {
            localStorage.setItem('#advertisementTabl', tbody.innerHTML);
        }

        modal.style.display = 'none';
        // alert('Данные обновлены и сохранены в localStorage (столбец «Действие» очищен во всей таблице)');
    });
})();