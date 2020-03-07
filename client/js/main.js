// Add JS Here
TogetherJS(document.getElementById("whiteboard"));

var canvas = document.getElementById("whiteboard");
var canvasContext = canvas.getContext("2d");
var canvasContainer = document.getElementById("whiteboardContainer");
var coord = document.getElementById("coord");
var mousePressed = false;
var prevCoord;
var tool = "brush";

// Change <div> and <canvas> size //

var width = 1000;
var height = 600;

//                                //

canvasContainer.style.width = String(width) + "px";
canvasContainer.style.height = String(height) + "px";
canvas.width = width;
canvas.height = height;

canvas.addEventListener("mousedown", 
    function(e) { 
        prevCoord = [e.offsetX, e.offsetY];
        mousePressed = mouseDown(); 
    });
canvas.addEventListener("mouseup", 
    function(e) {
        canvasContext.fill();
        canvasContext.stroke();
        mousePressed = mouseUp(); 
    });
canvas.addEventListener("mouseleave", function(e) { mousePressed = mouseUp(); })
canvas.addEventListener("mousemove", function(e) { draw(e, mousePressed, prevCoord); });

function mouseDown(){
    return true;
}

function mouseUp(){
    return false;
}

function brush(){
    tool = "brush";
}
function eraser(){
    tool = "eraser";
}

function draw(e, mousePressed, prevCoord){
    var x = e.offsetX;
    var y = e.offsetY;
    canvasContext.lineCap = "round";

    coord.innerText = "X: " + x + " || Y: " + y;
    if(!mousePressed)
        return prevCoord;

    if(tool === "eraser"){
        canvasContext.strokeStyle = "#ffffff";
        canvasContext.lineWidth = 30;
    }
    else if(tool === "brush"){
        canvasContext.strokeStyle = "#000000";
        canvasContext.lineWidth = 5;
    }

    // Begin path, draw line
    canvasContext.beginPath();
    canvasContext.moveTo(prevCoord[0], prevCoord[1]);
    canvasContext.lineTo(x, y);
    canvasContext.fill();
    canvasContext.stroke();

    // Set current coord to old coords
    prevCoord[0] = x;
    prevCoord[1] = y;
    return prevCoord;
}