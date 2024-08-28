import readline from 'readline';

let A = 0, B = 0, C = 0;

const cubeWidth = 20;
const width = 160, height = 44;
const zBuffer = new Array(width * height).fill(0); 
const buffer = new Array(width * height).fill(' '); 
const distanceFromCam = 100;
const horizontalOffset = 0;
const K1 = 40;

const incrementSpeed = 0.6;

const calculateX = (i, j, k) => {
    return j * Math.sin(A) * Math.sin(B) * Math.cos(C) - k * Math.cos(A) * Math.sin(B) * Math.cos(C) +
        j * Math.cos(A) * Math.sin(C) + k * Math.sin(A) * Math.sin(C) + i * Math.cos(B) * Math.cos(C);
}

const calculateY = (i, j, k) => {
    return j * Math.cos(A) * Math.cos(C) + k * Math.sin(A) * Math.cos(C) -
        j * Math.sin(A) * Math.sin(B) * Math.sin(C) + k * Math.cos(A) * Math.sin(B) * Math.sin(C) -
        i * Math.cos(B) * Math.sin(C);
}

const calculateZ = (i, j, k) => {
    return k * Math.cos(A) * Math.cos(B) - j * Math.sin(A) * Math.cos(B) + i * Math.sin(B);
}

const calculateForSurface = (cubeX, cubeY, cubeZ, ch) => {
    const x = calculateX(cubeX, cubeY, cubeZ);
    const y = calculateY(cubeX, cubeY, cubeZ);
    const z = calculateZ(cubeX, cubeY, cubeZ) + distanceFromCam;

    const ooz = 1 / z;
    const xp = Math.floor((width / 2 + horizontalOffset + K1 * ooz * x * 2));
    const yp = Math.floor((height / 2 + K1 * ooz * y));

    const idx = xp + yp * width;
    if (idx >= 0 && idx < width * height) {
        if (ooz > zBuffer[idx]) {
            zBuffer[idx] = ooz;
            buffer[idx] = ch;
        }
    }
}

const clearScreen = () => {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
}

const printBuffer = () => {
    let output = '';
    for (let k = 0; k < width * height; k++) {
        if (k % width === 0 && k !== 0) {
            output += '\n';
        }
        output += buffer[k];
    }
    process.stdout.write(output);
}

const main = () => {
    clearScreen();

    setInterval(() => {
        zBuffer.fill(0);
        buffer.fill(' ');

        for (let cubeX = -cubeWidth; cubeX < cubeWidth; cubeX += incrementSpeed) {
            for (let cubeY = -cubeWidth; cubeY < cubeWidth; cubeY += incrementSpeed) {
                calculateForSurface(cubeX, cubeY, -cubeWidth, '@');
                calculateForSurface(cubeWidth, cubeY, cubeX, '$');
                calculateForSurface(-cubeWidth, cubeY, -cubeX, '~');
                calculateForSurface(-cubeX, cubeY, cubeWidth, '#');
                calculateForSurface(cubeX, -cubeWidth, -cubeY, ';');
                calculateForSurface(cubeX, cubeWidth, cubeY, '+');
            }
        }

        for (let cubeX = -cubeWidth; cubeX < cubeWidth; cubeX += incrementSpeed) {
            for (let cubeY = -cubeWidth; cubeY < cubeWidth; cubeY += incrementSpeed) {
                calculateForSurface(cubeX, cubeY, -cubeWidth, '@');
                calculateForSurface(cubeWidth, cubeY, cubeX, '$');
                calculateForSurface(-cubeWidth, cubeY, -cubeX, '~');
                calculateForSurface(-cubeX, cubeY, cubeWidth, '#');
                calculateForSurface(cubeX, -cubeWidth, -cubeY, ';');
                calculateForSurface(cubeX, cubeWidth, cubeY, '+');
            }
        }

        for (let cubeX = -cubeWidth; cubeX < cubeWidth; cubeX += incrementSpeed) {
            for (let cubeY = -cubeWidth; cubeY < cubeWidth; cubeY += incrementSpeed) {
                calculateForSurface(cubeX, cubeY, -cubeWidth, '@');
                calculateForSurface(cubeWidth, cubeY, cubeX, '$');
                calculateForSurface(-cubeWidth, cubeY, -cubeX, '~');
                calculateForSurface(-cubeX, cubeY, cubeWidth, '#');
                calculateForSurface(cubeX, -cubeWidth, -cubeY, ';');
                calculateForSurface(cubeX, cubeWidth, cubeY, '+');
            }
        }

        clearScreen();
        printBuffer();

        A += 0.05;
        B += 0.05;
        C += 0.01;
    }, 1000 / 30);
}

main();
