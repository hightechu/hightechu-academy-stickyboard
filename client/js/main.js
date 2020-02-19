// Add JS Here

TogetherJS(document.getElementById("whiteboard"));

var canvas = document.getElementById("whiteboard");
var canvasContext = canvas.getContext("2d");

var coord = document.getElementById("coord");

var width = canvas.width;
var height = canvas.height
canvasContext.fillStyle(0, 0, 0);

function mouseDown(){
    mousePressed = true; 
}

function mouseUp(){
    mousePressed = false;
}

function draw(e){
    var x;
    var y;
    if (e.pageX || e.pageY) { 
        x = e.pageX;
        y = e.pageY;
    }
    else { 
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
    } 
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    coord.innerText = "X: " + x + " || Y: " + y;
    if(!mousePressed)
        return;

    canvasContext.beginPath();
    // canvasContext.rect(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop, 5, 5);
    // canvasContext.rect(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, 5, 5);
    canvasContext.rect(x, y, 5, 5);
    canvasContext.fill();
    canvasContext.stroke();
}