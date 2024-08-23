// Seleccionamos los elementos necesarios
const timerDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const customForm = document.getElementById('custom');

// Inicialización de variables
let countdown;

// Función principal para el temporizador
function timer(seconds) {
    clearInterval(countdown); // Limpiar cualquier temporizador previo

    const now = Date.now(); // Tiempo actual
    const then = now + seconds * 1000; // Tiempo futuro
    displayTimeLeft(seconds); // Mostrar el tiempo inicial
    displayEndTime(then); // Mostrar la hora de finalización

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft <= 0) {
            clearInterval(countdown);
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
}

// Mostrar el tiempo restante
function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
}

// Mostrar la hora de finalización
function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTimeDisplay.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

// Iniciar el temporizador al hacer clic en un botón
buttons.forEach(button => button.addEventListener('click', function() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}));

// Manejar el envío del formulario personalizado
customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});
