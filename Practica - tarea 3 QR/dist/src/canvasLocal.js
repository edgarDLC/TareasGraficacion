/*   GENERADOR DE QR
El programa funciona de la siguiente manera:
Se usa una matriz para representar al QR versión 2 25x25
Se definen los patrones de posición y luego se insertan en la matriz
Se define él patrón de alineamiento y luego se insertan en la matriz
Se definen los patrones formato y versión y luego se insertan en la matriz
Se definen el patrón de sepador de los patrones de posición  y luego se insertan en la matriz
Se extrae el URL del HTML, se determina su tamaño, se convierte a bytes y se define el modo byte
Se rellena la matriz con el formato de byte, el tamaño en bytes y el URL en bytes usando el patrón zig-zag.
Mediante el método fillRect se procede a dibujar los cuadrados del QR.
*/
export class CanvasLocal {
    constructor(g, canvas) {
        this.fontSize = 16;
        this.graphics = g;
        this.rWidth = 12;
        this.rHeight = 8;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
        this.centerX = this.maxX / 12;
        this.centerY = this.maxY / 8 * 7;
        this.fontSize = 16;
    }
    iX(x) { return Math.round(this.centerX + x / this.pixelSize); }
    iY(y) { return Math.round(this.centerY - y / this.pixelSize); }
    drawLine(x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
    }
    //éetodo para trazar trazar y rellenar el QR
    TrazarYRellenar(matrizQR) {
        const tam = matrizQR.length;
        const moduloTam = 15; // Tamaño en píxeles de cada módulo QR
        // Definir colores
        const colors = {
            0: '#FFFFFF', // Blanco para 0
            1: '#000000', // Negro para 1
            4: '#87CEEB', // Azul cielo para 4
            3: '#A41E01', //' Marron para 3 no usado
            7: '#FFFFFF' // Blanco para separadores 7
        };
        // Limpiar canvas
        this.graphics.clearRect(0, 0, this.maxX, this.maxY);
        // Dibujar cada módulo del QR
        for (let y = 0; y < tam; y++) {
            for (let x = 0; x < tam; x++) {
                const value = matrizQR[y][x];
                const color = colors[value] || '#FFFFFF';
                // Calcular posición en canvas
                const canvasX = 100 + x * moduloTam - 0.5;
                const canvasY = 100 + y * moduloTam - 0.5;
                this.graphics.fillStyle = color;
                //this.graphics.fillRect(X, Y, ancho, altura);
                this.graphics.fillRect(canvasX, canvasY, moduloTam, moduloTam);
                this.graphics.strokeStyle = '#EEEEEE';
                this.graphics.strokeRect(canvasX, canvasY, moduloTam, moduloTam);
            }
        }
    }
    //Metodo que repite el simbolo de posicionamiento en la matriz en las 3 esquinas
    rellenarMatrizPosicion(filas, columnas) {
        const matriz = [];
        for (let i = 0; i < filas; i++) {
            matriz[i] = Array(columnas).fill(3);
        }
        // Patrón de posicionamiento
        const patronPosicion = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ];
        // Función auxiliar para colocar el patrón en una posición específica
        const colocarPatron = (filaInicio, columnaInicio) => {
            for (let i = 0; i < 7; i++) {
                for (let j = 0; j < 7; j++) {
                    if (filaInicio + i < filas && columnaInicio + j < columnas) {
                        matriz[filaInicio + i][columnaInicio + j] = patronPosicion[i][j];
                    }
                }
            }
        };
        // Arriba izquierda 
        colocarPatron(0, 0);
        // Arriba derecha 
        colocarPatron(0, columnas - 7);
        // Abajo izquierda 
        colocarPatron(filas - 7, 0);
        return matriz;
    }
    rellenarMatrizAlineamiento(matrizQR) {
        const matriz = [...matrizQR]; // Copia de matriz
        // Patron de alineamiento
        const patronAlineamiento = [
            [1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 1, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1]
        ];
        const inicioX = 16;
        const inicioY = 16;
        // Se aplica patrón
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (inicioX + i < matriz.length && inicioY + j < matriz[0].length) {
                    matriz[inicioX + i][inicioY + j] = patronAlineamiento[i][j];
                }
            }
        }
        return matriz;
    }
    rellenarMatrizFormatoVersion(matrizQR) {
        const matriz = [...matrizQR];
        // Patron de formato arriba izquierda
        for (let i = 0; i <= 8; i++) {
            matriz[8][i] = 4; //4
            matriz[i][8] = 4; //4
        }
        // Patron de formato arriba derecha
        for (let i = 17; i < 25; i++) {
            matriz[8][i] = 4; //4
        }
        // 3. Patron de formato abajo izquierda
        for (let i = 17; i < 25; i++) {
            matriz[i][8] = 4; //4
        }
        return matriz;
    }
    rellenarMatrizSepadadorPatronesPosicion(matrizQR) {
        const matriz = [...matrizQR];
        // Formato separador de patron de posicion
        for (let i = 0; i < 8; i++) { //vertical
            matriz[i][7] = 0;
            matriz[i][17] = 0;
            matriz[i + 17][7] = 0;
        }
        for (let i = 0; i < 8; i++) { //horizontal
            matriz[7][i] = 0;
            matriz[7][i + 17] = 0;
            matriz[17][i] = 0;
        }
        return matriz;
    }
    convertirUrlABytes(tamano, url) {
        // Convertir el tamaño a binario (8 bits)
        const tamanoBinary = (tamano & 0xFF).toString(2).padStart(8, '0');
        // Convertir la URL a bytes 
        let urlBinary = '';
        for (let i = 0; i < url.length; i++) {
            const charCode = url.charCodeAt(i);
            const byte = charCode & 0xFF;
            urlBinary += byte.toString(2).padStart(8, '0');
        }
        const resultado = tamanoBinary + urlBinary;
        return resultado;
    }
    rellenarMatrizBytes(matrizQR, union) {
        const matriz = [...matrizQR];
        const tam = matriz.length;
        let bitInicio = 0;
        // Areas reservadas que no deben modificarse
        const areasReservadas = this.areasReservadas(tam);
        // Patrón de llenado en zig-zag
        for (let columna = tam - 1; columna >= 0; columna -= 2) {
            if (columna === 6)
                columna--;
            // Movimiento hacia arriba
            if ((tam - columna) % 4 === 1 || (tam - columna) % 4 === 0) {
                for (let fila = tam - 1; fila >= 0; fila--) {
                    if (this.esAreaModificable(fila, columna, areasReservadas, matriz)) {
                        if (bitInicio < union.length) {
                            matriz[fila][columna] = parseInt(union[bitInicio]);
                            bitInicio++;
                        }
                    }
                    // Columna adyacente derecha
                    if (columna > 0 && this.esAreaModificable(fila, columna - 1, areasReservadas, matriz)) {
                        if (bitInicio < union.length) {
                            matriz[fila][columna - 1] = parseInt(union[bitInicio]);
                            bitInicio++;
                        }
                    }
                }
            }
            // Movimiento hacia abajo
            else {
                for (let fila = 0; fila < tam; fila++) {
                    if (this.esAreaModificable(fila, columna, areasReservadas, matriz)) {
                        if (bitInicio < union.length) {
                            matriz[fila][columna] = parseInt(union[bitInicio]);
                            bitInicio++;
                        }
                    }
                    // Columna adyacente derecha
                    if (columna > 0 && this.esAreaModificable(fila, columna - 1, areasReservadas, matriz)) {
                        if (bitInicio < union.length) {
                            matriz[fila][columna - 1] = parseInt(union[bitInicio]);
                            bitInicio++;
                        }
                    }
                }
            }
        }
        return matriz;
    }
    areasReservadas(tam) {
        const reservadas = Array(tam).fill(null).map(() => Array(tam).fill(false));
        // Patrones de posición 
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 7; j++) {
                reservadas[i][j] = true;
                reservadas[i][tam - 1 - j] = true;
                reservadas[tam - 1 - i][j] = true;
            }
        }
        // Patrón de alineamiento 
        for (let i = 16; i < 21; i++) {
            for (let j = 16; j < 21; j++) {
                reservadas[i][j] = true;
            }
        }
        // Linea de formato y versión
        for (let i = 0; i < 9; i++) {
            reservadas[i][8] = true; // Vertical izquierda
            reservadas[8][i] = true; // Horizontal arriba
            if (i < 8) {
                reservadas[8][tam - 1 - i] = true; // Horizontal arriba derecha
                reservadas[tam - 1 - i][8] = true; // Vertical abajo izquierda
            }
        }
        // Separadores
        for (let i = 0; i < 8; i++) {
            reservadas[i][7] = true;
            reservadas[i][17] = true;
            reservadas[i + 17][7] = true;
            reservadas[7][i] = true;
            reservadas[7][i + 17] = true;
            reservadas[17][i] = true;
        }
        return reservadas;
    }
    //verificación si es modificable o es area reservada
    esAreaModificable(row, col, reservadas, matriz) {
        return !reservadas[row][col] && (matriz[row][col] === 3 || matriz[row][col] === 0 || matriz[row][col] === 1);
    }
    mostrarMatrizEnConsola(matriz) {
        console.log("Matriz QR (25x25):");
        console.log("----------------------------------------");
        let fila = "";
        for (let i = 0; i < matriz.length; i++) {
            for (let j = 0; j < matriz[i].length; j++) {
                fila += matriz[i][j] + " ";
            }
            fila += "\n";
        }
        console.log(fila);
        console.log("----------------------------------------");
    }
    paint(url) {
        // rellenar con los patrones de posicion
        let matrizQR = this.rellenarMatrizPosicion(25, 25);
        // rellenar con el patrón de alineamiento
        matrizQR = this.rellenarMatrizAlineamiento(matrizQR);
        // rellenar área de formato y versión
        matrizQR = this.rellenarMatrizFormatoVersion(matrizQR);
        // rellenar separador de patrones de posicion
        matrizQR = this.rellenarMatrizSepadadorPatronesPosicion(matrizQR);
        // convertir URL a bytes
        if (url) {
            console.log("URL: ", url);
            const tamano = url.length;
            const urlBytes = this.convertirUrlABytes(tamano, url);
            const modo = "0100"; // Modo Byte
            const union = modo + tamano + urlBytes;
            console.log(union);
            //Método para rellenar la matriz con los bytes del URL
            matrizQR = this.rellenarMatrizBytes(matrizQR, union);
        }
        //Mostrar la matriz en consola
        this.mostrarMatrizEnConsola(matrizQR);
        //Se procede a crear el QR
        this.TrazarYRellenar(matrizQR);
    }
}
