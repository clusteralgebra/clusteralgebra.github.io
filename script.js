const el=document.getElementById('myCanvas');
const ctx = el.getContext('2d');
    
var n = 2;

var grid;
var perm;
var inc;
function setUp(){
    grid = Array(n).fill().map(() => Array(n).fill(0));
    perm = Array(n).fill(0);
    for (let t = 0; t < n; t++) { 
        perm[t] = t+1;
    }
    inc = el.width / n;
}

function square(x, y) { 
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.rect(x, y, inc, inc)
    ctx.stroke();
}

function halfElbow(x, y) { 
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.arc(x, y, inc/2, 0, Math.PI/2);
    ctx.stroke();
}

function elbow(x, y) {
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.arc(x, y, inc/2, 0, Math.PI/2);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.arc(x + inc, y +inc, inc/2, Math.PI, (1.5)*Math.PI);
    ctx.stroke();
}

function cross(x, y) {
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.moveTo(x+inc/2, y);
    ctx.lineTo(x+inc/2, y+inc)
    ctx.moveTo(x, y+inc/2);
    ctx.lineTo(x+inc, y+inc/2);
    ctx.stroke();
}

function drawGrid() {
    ctx.clearRect(0, 0, el.width, el.height);
    
    for (let i = 0; i < n; i++) { 
        for (let j = 0; j < n; j++) { 
            square(i * inc, j * inc);
        }
    }

    for (let i = 0; i < n; i++) { 
        for (let j = 0; j < n-i; j++){
            if (i + j == n-1) { 
                halfElbow(i*inc, j*inc);
            }
            else if (grid[j][i] == 0) { 
                elbow(i*inc, j*inc);
            }
            else {
                cross(i*inc, j*inc);
            }
        }
    }
}

function updatePermutation() { 
    for (let i = 0; i < n; i++) {
        perm[i] = i+1;
    }
    for (let i = 0; i < n-1; i++) {
        for (let j = n-2-i; j >= 0; j--) {
            if (grid[i][j] == 1){
                k = i+j;
                temp = perm[k];
                perm[k] = perm[k+1];
                perm[k+1] = temp;
            }
        }
    }
}

el.addEventListener('click', function(event) {
    var rect = el.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;
    var a = Math.floor(mouseX / inc);
    var b = Math.floor(mouseY / inc);
    if (a+b < n-1){
        if (grid[b][a] == 0) {
            grid[b][a] = 1;
        }
        else {
            grid[b][a] = 0;
        }
    }
    drawGrid();
    updatePermutation();
    const mario = document.getElementById("permutation").innerHTML = "Permutation: " + perm;
});

function updateNumber() {
    console.log("hi");
    n = parseInt(document.getElementById("num").value);
    setUp();
    drawGrid();
}
setUp();
drawGrid();
document.getElementById("num").addEventListener("change", updateNumber);
