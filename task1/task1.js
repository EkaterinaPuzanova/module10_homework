// начало -- создаем кнопку button и добавляем в DOM
let button = document.createElement('button');
button.className = "button";
button.innerHTML = `
                    <div class="button__text">Имитация запроса данных</div>
                    <div class="button__svg"></div>
`;
document.body.append(button);
// конец -- создаем кнопку button и добавляем в DOM


// начало -- задаем InnerHTML для svg-иконки
const objDataTransparent = {
    key1: '',
    key2: 'fill-rule="evenodd"',
    key3: 'M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-5.904-2.854a.5.5 0 1 1 .707.708L6.707 9.95h2.768a.5.5 0 1 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.475a.5.5 0 1 1 1 0v2.768l4.096-4.097z'
}
const objDataColor = {
    key1: '-fill',
    key2: '',
    key3: 'M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-5.904-2.803a.5.5 0 1 1 .707.707L6.707 10h2.768a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.525a.5.5 0 0 1 1 0v2.768l4.096-4.096z'
}
function getSvgInnerHTML(obj) {
    return `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle${obj.key1}" viewBox="0 0 16 16">
                <path ${obj.key2} d="${obj.key3}"/>
            </svg>
        `
}
// конец -- задаем InnerHTML для svg-иконки


const buttonSVG = button.querySelector('.button__svg');
buttonSVG.innerHTML = getSvgInnerHTML(objDataTransparent);


// функция изменения заливки svg-иконки
function changeFill() {
    buttonSVG.classList.toggle('fill-svg');
    buttonSVG.innerHTML = (buttonSVG.classList.value.includes('fill-svg')) ? getSvgInnerHTML(objDataColor) : getSvgInnerHTML(objDataTransparent);
}


// вешаем слушатель собитий: при клике на кнопку выполняем функцию изменения заливки svg-иконки
button.addEventListener('click', changeFill);
