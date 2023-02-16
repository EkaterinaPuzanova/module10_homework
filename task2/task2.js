const button = document.querySelector('.js-button');

function showScreenSize() {
    alert(`Ширина экрана ${window.screen.width}px
Высота экрана ${window.screen.height}px`)
}

button.addEventListener('click', showScreenSize);