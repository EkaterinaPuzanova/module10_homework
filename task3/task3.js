const messagesField = document.querySelector('.chat__messages');
const buttonSend = document.querySelector('.button-send');
const input = document.querySelector('.input');
const buttonLocation = document.querySelector('.button-location');

let websocket;
let flagSentLocation = false;


// отрисовка сообщения
function writeMessage(text, position = 'right') {
    messagesField.innerHTML += `
        <div class="chat__message ${position}">
            <p class="chat__text">${text}</p>
        </div>
    `;
}

// отрисовка геолокации
function writeGeoLocation(latitude, longitude) {
    messagesField.innerHTML += `
        <div class="chat__message right">
            <a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" class="link" target="_blank">
                <p class="chat__text link-text">Гео-локация</p>
            </a>
        </div>
    `;
}


// НАЧАЛО --  работа с WebSocket
// создаем WebSocket-соединение
function createWebSocket() {
    const wsUri = "wss://echo-ws-service.herokuapp.com";

    websocket = new WebSocket(wsUri);

    websocket.onopen = function() {
        console.log("CONNECTED");
    };
    websocket.onclose = function() {
        console.log("DISCONNECTED");
    };
    websocket.onmessage = function(evt) {
        if (!flagSentLocation) {
            writeMessage(evt.data, 'left');
            messagesField.scrollTop = 9999;
        } else {
            flagSentLocation = false;
        }
    }
    websocket.onerror = function(evt) {
        (!flagSentLocation) ? writeMessage('ERROR: ' + evt.data, 'left') : flagSentLocation = false;
    };
}
createWebSocket();

// при клике на кнопку "Отправить" выводим сообщение в чат и отправляем его на эхо-сервер
buttonSend.addEventListener('click', () => {
    writeMessage(input.value);
    websocket.send("RESPONSE: " + input.value);
    console.log("SENT: " + input.value);
});
// КОНЕЦ -- работа с WebSocket


// НАЧАЛО -- определение гео-локации
// Функция, выводящая текст об ошибке
const error = () => {
    writeMessage('Невозможно получить ваше местоположение');
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    writeGeoLocation(latitude, longitude);
    messagesField.scrollTop = 9999;

    flagSentLocation = true;
    websocket.send(`RESPONSE GEOLOCATION: Широта: ${latitude} ° - Долгота: ${longitude} °`);
    console.log(`SENT: Широта: ${latitude} ° - Долгота: ${longitude} °`);
}

// при клике на кнопку "Гео-локация" выполняем функцию, срабатывающую при успешном получении геолокации
buttonLocation.addEventListener('click', () => {
    if (!navigator.geolocation) {
        writeMessage('Geolocation не поддерживается вашим браузером');
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
});
// КОНЕЦ -- определение гео-локации