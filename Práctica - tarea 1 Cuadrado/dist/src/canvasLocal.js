export class CanvasLocal {
    // Constructor
    constructor(g, canvas) {
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
    iX(x) { return Math.round(this.centerX + x / this.pixelSize); }
    // Método para convertir coordenadas Y
    iY(y) { return Math.round(this.centerY - y / this.pixelSize); }
    // Método para dibujar una línea
    drawLine(x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
    }
    // Método para pintar el Triángulo
    paint() {
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
        let xA, yA, xB, yB, xC, yC;
        let xA1, yA1, xB1, yB1, xC1, yC1;
        let p, q;
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
