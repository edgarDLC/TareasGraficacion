/*
  Se calcula y ajusta el espacio entre cada barra.
  Solo admite un maxima de 9 elementos, que evitan la superposición de las barras.
  En caso de haber mas de 9 elementos, muestra una advertencia 
*/
export class CanvasLocal {
  //atributos
  protected graphics: CanvasRenderingContext2D;
  protected rWidth:number; //ancho
  protected rHeight:number; //alto
  protected maxX: number; 
  protected maxY: number; 
  protected pixelSize: number;
  protected centerX: number;
  protected centerY: number;
  protected fontSize: number = 16;
      
  public constructor(g: CanvasRenderingContext2D, canvas: HTMLCanvasElement){
    this.graphics = g;
    this.rWidth = 12;
    this.rHeight= 8;
    this.maxX = canvas.width - 1; 
    this.maxY = canvas.height - 1;
    this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
    this.centerX = this.maxX/12;
    this.centerY = this.maxY/8*7;
    this.fontSize = 16;
  }

  iX(x: number):number{return Math.round(this.centerX + x/this.pixelSize);}
  iY(y: number):number{return Math.round(this.centerY - y / this.pixelSize); }

  drawLine(x1: number, y1: number, x2: number, y2:number) { //Metodo de dibujo
    this.graphics.beginPath();
    this.graphics.moveTo(x1, y1);
    this.graphics.lineTo(x2, y2);
    this.graphics.closePath();
    this.graphics.stroke();
  }

  // Método para dibujar la cuadrícula de fondo
  cuadricula(){ 
    const actualStyle = this.graphics.strokeStyle; // Guardar el estilo actual
    const actualStyleLinea = this.graphics.lineWidth;
    
    this.graphics.strokeStyle = 'rgba(200, 200, 200, 0.5)'; // Nuevo estilo para la cuadricula
    this.graphics.lineWidth = 0.5;//1
    
    for (let x = -0.2; x <= this.rWidth - 2; x += 1) { // Líneas verticales
      this.drawLine(this.iX(x), this.iY(0), this.iX(x), this.iY(this.rHeight-1));
    }
    
    for (let y = 0; y <= this.rHeight - 1; y += 1) { // Líneas horizontales
      this.drawLine(this.iX(0), this.iY(y), this.iX(this.rWidth-2), this.iY(y));
    }
    this.graphics.strokeStyle = actualStyle; // Restaurar el estilo original
    this.graphics.lineWidth = actualStyleLinea;
  }

  maxH(h: number[]): number{
    let max = h[0];
    for (let i = 1; i < h.length; i++) {
      if (max < h[i])
        max = h[i];
    }
    
    let res:number;
    let pot: number = 10;
    //Se calcula la potencia de 10 mayor al max para redondear el maximo de la grafica.
    while (pot<max) {
      pot *= 10;
    }
    pot /= 10;
    res = Math.ceil(max / pot) * pot;
    return res;
  }

  //Método para rellenar las areas(cada area cuenta con 4 vertices) de color
  rellenar(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, color: string, strokeColor: string = 'black'){
    const rellenoStryleActual = this.graphics.fillStyle; //Estilos actuales
    const trazoStryleActual = this.graphics.strokeStyle;
    
    this.graphics.fillStyle = color;  //Cambio de los estilos
    this.graphics.strokeStyle = strokeColor;
    
    // Dibujar y rellenar
    this.graphics.beginPath();
    this.graphics.moveTo(x1, y1);
    this.graphics.lineTo(x2, y2);
    this.graphics.lineTo(x3, y3);
    this.graphics.lineTo(x4, y4);
    this.graphics.closePath();
    this.graphics.fill();
    this.graphics.stroke();

    this.graphics.fillStyle = rellenoStryleActual;//Restaurar estilos
    this.graphics.strokeStyle = trazoStryleActual;
  }

  //Devuelve un color oscuro para dar profuncidad
  colorOscuro(color: string, percent: number): string {
    const colorValues: Record<string, string> = {
        'magenta': 'rgb(139, 0, 139)',    // Magenta oscuro
        'red': 'rgb(139, 0, 0)',          // Rojo oscuro
        'green': 'rgb(0, 100, 0)',        // verde oscuro
        'blue': 'rgb(0, 0, 139)',         // blue oscuro
        'lightgray': 'rgb(148, 148, 148)' // gris oscuro
      };
      
      return colorValues[color.toLowerCase()] || color;
  }
  /*Vertices
         8
        / \9
       7\10/
        |||
       3\4/5
       2|||6
        \ /
         1
  */
  //Método de relleno y creacion
  barra(x: number, y: number, alt: number, color: string, porcentaje: number): void {
  //vertices de la figura
    const p1 = {x: this.iX(x), y: this.iY(0)};//vertice 1
    const p2 = {x: this.iX(x-0.5), y: this.iY(y+0.3)};//vertice 2
    const p3 = {x: this.iX(x-0.5), y: this.iY(y+alt)};//vertice 3
    const p4 = {x: this.iX(x), y: this.iY(y+alt-0.3)};//vertice 4
    const p5 = {x: this.iX(x+0.5), y: this.iY(y+alt)};//vertice 5
    const p6 = {x: this.iX(x+0.5), y: this.iY(0.3)};//vertice 6    
    const p7 = {x: this.iX(x-0.5), y: this.iY(this.rHeight-1)};//vertice 7
    const p8 = {x: this.iX(x), y: this.iY(this.rHeight-0.7)};//vertice 8
    const p9 = {x: this.iX(x+0.5), y: this.iY(this.rHeight-1)};//vertice 9
    const p10 = {x: this.iX(x), y: this.iY(this.rHeight-1.3)};//vertice 10

    // 1. Primera área izq colors oscuro
    this.rellenar(
      p1.x, p1.y,
      p2.x, p2.y, 
      p3.x, p3.y, 
      p4.x, p4.y, 
      this.colorOscuro(color, 30), 'black'
    );

    // 2. Segunda área der colors normal
    this.rellenar(
      p1.x, p1.y, 
      p4.x, p4.y,
      p5.x, p5.y, 
      p6.x, p6.y, 
      color,
      'black'
    );

    // 3. Tercera área izq gris oscuro
    this.rellenar(
      p3.x, p3.y, 
      p4.x, p4.y, 
      p9.x, p9.y, 
      p7.x, p7.y, 
      'lightgray', 
      'black'
    );

    // 4. Cuarta área der blanco normal
    this.rellenar(
      p4.x, p4.y, 
      p10.x, p10.y, 
      p9.x, p9.y, 
      p5.x, p5.y, 
      'white', 
      'black'
    );

    // 5. Quinta área sima: si el valor es 100% la sima tambien se pinta
    let quintaAreaColor: string;
    if(porcentaje == 100) 
      quintaAreaColor = this.colorOscuro(color, 30);
    else
      quintaAreaColor = 'lightgray';

    this.rellenar(
      p7.x, p7.y, 
      p8.x, p8.y, 
      p9.x, p9.y, 
      p10.x, p10.y, 
      quintaAreaColor, 
      'black'
    );
    
  }

  advertenciaTamano(datos: number){
    const advertencia = document.getElementById("advertencia");
    if(datos > 9){
      if(advertencia){
        advertencia.textContent = "Solo se permiten maximo 9 elementos para graficar. No se mostraran los elementos extra.";
        advertencia.style.display = "block";
        console.warn("Solo se permiten maximo 9 elementos para graficar. No se mostraran los elementos extra.");
      }
    }else{
      advertencia.style.display = "none";
    }
  }


  paint() {
    // Borde del canvas
    this.drawLine(0, 0, 0, 480); // Izquierda
    this.drawLine(0, 0, 640, 0); // Arriba
    this.drawLine(640, 0, 640, 480); // Derecha
    this.drawLine(640, 480, 0, 480); // Abajo

    let h: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    //let h: number[] = [20, 100, 160, 420];
    //let h: number[] = [1150, 1780, 1260, 1500, 2000];
    //let h: number[] = [27, 10, 16, 30, 50, 73, 13];

    let datos= h.length; 
    this.advertenciaTamano(datos);
    if(h.length>9) //se limita a 9 elementos
      h = h.slice(0, 9);

    let maxEsc: number;
    let colors: string[]= ['magenta', 'red', 'green', 'blue'];

    maxEsc = this.maxH(h);

    // Cuadrícula de fondo 
    this.cuadricula();
  
    //Estilo texto 
    const fuenteActual = this.graphics.font;
    this.graphics.font = `${this.fontSize}px Arial`;

    //Manejo de espacio dinamico entre barras
    const totalBarras = h.length; //Número de barras
    const anchoDisponible = this.rWidth - 2; // Ancho disponible para las barras
    const anchoBarra = 1; // Ancho de cada barra
    const separacion = (anchoDisponible - (totalBarras * anchoBarra)) / (totalBarras + 1); // Espacio dinámico

    for (let i = 0; i < totalBarras; i++) {
      const x = separacion + i * (anchoBarra + separacion);
      this.graphics.strokeStyle = colors[i%4];
      let porcentaje: number;
      porcentaje = (h[i] / maxEsc) * 100;
      this.graphics.strokeText(porcentaje.toFixed(1)+"%", this.iX(x + (anchoBarra/2) -0.3), this.iY(-0.5));// valores porcentajes
      this.barra(x + anchoBarra/2, 0, h[i]*(this.rHeight-1)/maxEsc, colors[i%4], porcentaje);
      console.log(porcentaje);
    }

    // Valores en eje Y 
    const fuenteActual2 = this.graphics.font; //Estilos
    this.graphics.font = `${this.fontSize-3}px Arial`;
    this.graphics.strokeStyle = 'black';

    const numIntervalos = 8; // Número de intervalos en el eje Y
    const intervalo = maxEsc / (numIntervalos - 1); // Valor de cada intervalo
    
    for (let i = 0; i <= numIntervalos; i++) {
      const yValue = i * intervalo;
      const yPos = this.rHeight * (i / numIntervalos);
      
      // Mostrar el valor
      this.graphics.strokeText(
        Math.round(yValue).toString(),
        this.iX(-0.8), 
        this.iY(yPos)
      );
    }
    
  }
}

