export class CanvasLocal {
  protected graphics: CanvasRenderingContext2D;
  protected rWidth: number;
  protected rHeight: number;
  protected maxX: number;
  protected maxY: number;
  protected pixelSize: number;
  protected centerX: number;
  protected centerY: number;

  // Constructor
  public constructor(g: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.graphics = g;
    this.rWidth = 6;
    this.rHeight = 4;
    this.maxX = canvas.width - 1;
    this.maxY = canvas.height - 1;
    this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
    this.centerX = this.maxX / 2;
    this.centerY = this.maxY / 2;
  }

  // Método para convertir coordenadas X
  protected iX(x: number): number { return Math.round(this.centerX + x / this.pixelSize); }

  // Método para convertir coordenadas Y
  protected iY(y: number): number { return Math.round(this.centerY - y / this.pixelSize); }

  // Método para dibujar una línea
  protected drawLine(x1: number, y1: number, x2: number, y2: number): void {
    this.graphics.beginPath();
    this.graphics.moveTo(x1, y1);
    this.graphics.lineTo(x2, y2);
    this.graphics.closePath();
    this.graphics.stroke();
  }

  // Método para pintar el Triángulo
  public paint(): void {

    // Borde del canvas
    this.drawLine(0, 0, 0, 480); // Izquierda
    this.drawLine(0, 0, 640, 0); // Arriba
    this.drawLine(640, 0, 640, 480); // Derecha
    this.drawLine(640, 480, 0, 480); // Abajo

    // Parámetros del triángulo
    let lado = 500;
    let side = 0.95 * lado;
    let sideHalf = 0.5 * side;
    let xCenter = 320;
    let yCenter = 240;

    // Altura del triángulo equilátero
    let h = sideHalf * Math.sqrt(3);

    // Coordenadas iniciales del triángulo
    let xA: number, yA: number, xB: number, yB: number, xC: number, yC: number;
    let xA1: number, yA1: number, xB1: number, yB1: number, xC1: number, yC1: number;
    let p: number, q: number;

    q = 0.05;
    p = 1 - q;

    // Coordenadas iniciales del triángulo 
    xA = xCenter - sideHalf;
    yA = yCenter + 0.5 * h;  
    xB = xCenter + sideHalf;
    yB = yA;  
    xC = xCenter;
    yC = yCenter - 0.5 * h;  

    for (let i = 0; i < 20; i++) {
      //Se dibuja en Triángulo
      this.drawLine(xA, yA, xB, yB);
      this.drawLine(xB, yB, xC, yC);
      this.drawLine(xC, yC, xA, yA);

      // Calcular los nuevos puntos del triángulo
      xA1 = p * xA + q * xB;
      yA1 = p * yA + q * yB;
      xB1 = p * xB + q * xC;
      yB1 = p * yB + q * yC;
      xC1 = p * xC + q * xA;
      yC1 = p * yC + q * yA;

      // Actualizar los puntos del triángulo
      xA = xA1;
      xB = xB1;
      xC = xC1;
      yA = yA1;
      yB = yB1;
      yC = yC1;
    }
  }
}