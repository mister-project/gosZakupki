// скрипт изменять положение меню на экране мышкой или пальцами, при необходимости
'use strict'
console.log('скрипт moveMenu.js работает и сдвигает меню пальцами');
const funMoveMenu = () => {
    const menu = document.querySelector('.menu');

    let startX = 0,
        startY = 0; // где был палец/курсор при нажатии
    let startLeft = 0,
        startTop = 0; // где была плашка при нажатии
    let moved = false; // было ли реальное перетаскивание

    function onPointerDown(e) {
        // перетаскиваем только за саму плашку, не за ссылки внутри
        if (e.target.closest('a, button')) return;

        menu.setPointerCapture(e.pointerId);

        const rect = menu.getBoundingClientRect();
        // переключаемся с right/bottom на left/top — так удобнее считать
        menu.style.left = rect.left + 'px';
        menu.style.top = rect.top + 'px';
        menu.style.right = 'auto';
        menu.style.bottom = 'auto';

        startX = e.clientX;
        startY = e.clientY;
        startLeft = rect.left;
        startTop = rect.top;
        moved = false;

        menu.addEventListener('pointermove', onPointerMove);
        menu.addEventListener('pointerup', onPointerUp);
    }

    function onPointerMove(e) {
        let newLeft = startLeft + (e.clientX - startX);
        let newTop = startTop + (e.clientY - startY);

        if (Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5) {
            moved = true;
        }

        // не даём утащить плашку за пределы экрана
        const maxX = window.innerWidth - menu.offsetWidth;
        const maxY = window.innerHeight - menu.offsetHeight;
        newLeft = Math.min(Math.max(0, newLeft), maxX);
        newTop = Math.min(Math.max(0, newTop), maxY);

        menu.style.left = newLeft + 'px';
        menu.style.top = newTop + 'px';
    }

    function onPointerUp(e) {
        menu.removeEventListener('pointermove', onPointerMove);
        menu.removeEventListener('pointerup', onPointerUp);

        if (moved) {
            // перетаскивание — глушим клик, чтобы не сработали ссылки
            e.preventDefault();
            e.stopPropagation();
        }
    }

    menu.addEventListener('pointerdown', onPointerDown);

}
funMoveMenu();