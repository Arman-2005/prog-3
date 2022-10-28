var socket = io();

function generator(matLen, gr, grEat, pr, tar, dg) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < tar; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < dg; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    return matrix;
}

function createMatrixObjects() {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var gr = new GrassEater(x, y);
                grassEaterArr.push(gr);
            }
            else if (matrix[y][x] == 3) {
                var gr = new Predater(x, y);
                predaterArr.push(gr);
            }
            else if (matrix[y][x] == 4) {
                var gr = new Tarakan(x, y);
                tarakanArr.push(gr);
            }
            else if (matrix[y][x] == 5) {
                var gr = new Dog(x, y);
                dogArr.push(gr);
            }

        }
    }
}

function keydown(evt) {
    if (evt.key == "x") {
        background('#acacac');
        side = 20;
        matrix = generator(15, 8, 10, 8, 3, 5);
        grassArr = [];
        grassEaterArr = []
        predaterArr = []
        tarakanArr = []
        dogArr = []
        createMatrixObjects()
        
    }
}

var side = 20;

var matrix = generator(15, 8, 10, 8, 3, 5);

var grassArr = []
var grassEaterArr = []
var predaterArr = []
var tarakanArr = []
var dogArr = []
function setup() {
    frameRate(2);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    createMatrixObjects()
}
function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("orange");
                rect(x * side, y * side, side, side);
            }
        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].mul();
        grassEaterArr[i].eat()
    }
    for (var i in predaterArr) {
        predaterArr[i].mul();
        predaterArr[i].eat()
    }
    for (var i in tarakanArr) {
        tarakanArr[i].mul();
        tarakanArr[i].eat()
    }
    for (var i in dogArr) {
        dogArr[i].mul();
        dogArr[i].eat()
    }

    if (frameCount % 60 == 0) {
        console.log(frameCount);
        let grass = grassArr.length ;
        let grassEater = grassEaterArr.length;
        let predater = predaterArr.length;  
        let dog = dogArr.length;
        let tarakan = tarakanArr.length;
        let statistic = {
              grass,
              grassEater,
              predater,
              dog,
              tarakan
        }
          socket.emit("send data", statistic);
          console.log("xot"+ grass + ","+ "xotaker"+ grass)
      }
}



window.onkeydown = keydown;

