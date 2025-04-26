import { CanvasLocal } from './canvasLocal.js';

let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;

canvas = <HTMLCanvasElement>document.getElementById('circlechart');
graphics = canvas.getContext('2d');

const miCanvas:CanvasLocal = new CanvasLocal(graphics, canvas);

function handleGenerateQR() {
    const urlInput = <HTMLInputElement>document.getElementById('urlInput');
    const url = urlInput.value.trim();
    
    if (url) {
      console.log("URL ingresada:", url);
      miCanvas.paint(url); 
    } else {
      console.log("Por favor ingresa una URL válida");
    }
  }
  
  document.getElementById('generateBtn')?.addEventListener('click', handleGenerateQR);

miCanvas.paint();