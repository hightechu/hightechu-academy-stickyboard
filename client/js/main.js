// Add JS Here

TogetherJS(document.getElementById("whiteboard"));

var canvas = document.getElementById("whiteboard");
var canvasContext = canvas.getContext("2d");
var canvasContainer = document.getElementById("whiteboardContainer");
var coord = document.getElementById("coord");
var mousePressed = false;

// Change <div> and <canvas> size //

var width = 1000;
var height = 600;

//                                //

canvasContainer.style.width = String(width) + "px";
canvasContainer.style.height = String(height) + "px";
canvas.width = width;
canvas.height = height;

canvas.addEventListener("mousedown", function(e) { mousePressed = mouseDown(); });
canvas.addEventListener("mouseup", function(e) { mousePressed = mouseUp(); });
canvas.addEventListener("mouseleave", function(e) { mousePressed = mouseUp(); })
canvas.addEventListener("mousemove", function(e) { draw(e, mousePressed); });

function mouseDown(){
    return true;
}

function mouseUp(){
    return false;
}

function draw(e, mousePressed){
    var x = e.offsetX;
    var y = e.offsetY;

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