import { CanvasLocal } from './canvasLocal.js';
import { CanvasLocalCuadrado } from './canvasLocalCuadrado.js';

// Configurar el canvas para el triángulo
let canvasTriangulo: HTMLCanvasElement = document.getElementById('circlechart') as HTMLCanvasElement;
let graphicsTriangulo: CanvasRenderingContext2D = canvasTriangulo.getContext('2d')!;
const miCanvasTriangulo: CanvasLocal = new CanvasLocal(graphicsTriangulo, canvasTriangulo);
miCanvasTriangulo.paint();

// Configurar el canvas para el cuadrado
let canvasCuadrado: HTMLCanvasElement = document.getElementById('circlechart2') as HTMLCanvasElement;
let graphicsCuadrado: CanvasRenderingContext2D = canvasCuadrado.getContext('2d')!;
const miCanvasCuadrado: CanvasLocalCuadrado = new CanvasLocalCuadrado(graphicsCuadrado, canvasCuadrado);
miCanvasCuadrado.paint();