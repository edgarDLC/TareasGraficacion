import { CanvasLocal } from './canvasLocal.js';
import { CanvasLocalCuadrado } from './canvasLocalCuadrado.js';
// Configurar el canvas para el triángulo
let canvasTriangulo = document.getElementById('circlechart');
let graphicsTriangulo = canvasTriangulo.getContext('2d');
const miCanvasTriangulo = new CanvasLocal(graphicsTriangulo, canvasTriangulo);
miCanvasTriangulo.paint();
// Configurar el canvas para el cuadrado
let canvasCuadrado = document.getElementById('circlechart2');
let graphicsCuadrado = canvasCuadrado.getContext('2d');
const miCanvasCuadrado = new CanvasLocalCuadrado(graphicsCuadrado, canvasCuadrado);
miCanvasCuadrado.paint();
