var _a;
import { CanvasLocal } from './canvasLocal.js';
let canvas;
let graphics;
canvas = document.getElementById('circlechart');
graphics = canvas.getContext('2d');
const miCanvas = new CanvasLocal(graphics, canvas);
// Función para manejar la generación del QR
function handleGenerateQR() {
    const urlInput = document.getElementById('urlInput');
    const url = urlInput.value.trim();
    if (url) {
        console.log("URL ingresada:", url);
        miCanvas.paint(url); // Pasamos la URL al método paint
    }
    else {
        console.log("Por favor ingresa una URL válida");
    }
}
// Agregar event listener al botón
(_a = document.getElementById('generateBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', handleGenerateQR);
miCanvas.paint();
