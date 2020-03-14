// HTML elements
var canvas = document.getElementById("whiteboard");
var canvasContext = canvas.getContext("2d");
var canvasContainer = document.getElementById("whiteboardContainer");

// Vars for drawing
var mousePressed = false;
var prevCoord;
var tool = "brush";

var mx;
var my;

// Vars for resizing adjustment
var startingWidth = window.innerWidth;
var startingHeight = window.innerHeight;
var currentWidth = startingWidth;
var currentHeight = startingHeight;
var startingOffLeft = canvas.offsetLeft;
var startingOffTop = canvas.offsetTop;

// Set canvas width
canvas.width  = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Receive canvas image on join
TogetherJS.hub.on("init", function (msg) {
    if (! msg.sameUrl) {
        return;
    }

    // Draws the existing whiteboard onto new client canvas
    var image = new Image();   
    image.src = msg.image;
    canvasContext.drawImage(image, 0, 0);
});

// Send canvas image on client join
TogetherJS.hub.on("togetherjs.hello", function(msg){
    if(!msg.sameUrl){
        return;
    }
    
    var image = canvas.toDataURL("image/png"); // Copy of canvas
    TogetherJS.send({
        type: "init",
        image: image
    });
});

// Receive command to draw from other client
TogetherJS.hub.on("draw", function(msg){
    if(!msg.sameUrl){
        return;
    }
    draw(msg.ex, msg.ey, msg.pex, msg.pey, msg.remote, msg.colour, msg.size, msg.tool); // Remote draw() call
});

// Clear board from other clients
TogetherJS.hub.on("clear", function(msg){
    if(!msg.sameUrl){
        return;
    }
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
});

// Change Canvas on screen size change
window.addEventListener("resize", 
    function(e){ 
        currentWidth = window.innerWidth; 
        currentHeight = window.innerHeight; 
    });

// Event listeners
canvas.addEventListener("mousedown", 
    function(e) { 
        mousePos(e);
        prevCoord = [mx, my]; // Sets "anchor" for drawing
        mousePressed = mouseDown(); 
    });
canvas.addEventListener("mouseup", 
    function(e) {
        // Finish the line
        canvasContext.fill();
        canvasContext.stroke();
        mousePressed = mouseUp(); 
    });

canvas.addEventListener("mouseleave", 
    function(e) {
        mousePos(e);
        if(mousePressed){
            // Call draw() locally
            draw(mx, my, prevCoord[0], prevCoord[1], false, 
                document.getElementById("colors").value, document.getElementById("width").value, tool); 
        }
        prevCoord = [mx, my]; // Sets new anchor
        mousePressed = false;
    })
canvas.addEventListener("mousemove", 
    function(e) {
        mousePos(e);
        if(mousePressed){
            // Call draw() locally
            draw(mx, my, prevCoord[0], prevCoord[1], false, 
                document.getElementById("colors").value, document.getElementById("width").value, tool); 
        }
        prevCoord = [mx, my]; // Sets new anchor
    });

// In case the functions need to be expanded
function mouseUp(){
    return false;
}
function mouseDown(){
    return true;
}

// Change tool button event handlers
function brush(){
    tool = "brush";
    document.getElementById("brush").style.textDecoration = "underline";
    document.getElementById("eraser").style.backgroundColor = "none";
}
function eraser(){
    tool = "eraser";
    document.getElementById("eraser").style.textDecoration = "underline";
    document.getElementById("brush").style.textDecoration = "none";
}

// Change coords of mouse
function mousePos(e){
    mx = (e.pageX * (startingWidth / currentWidth)) - startingOffLeft;
    my = (e.pageY * (startingHeight / currentHeight)) - startingOffTop;
}

// Clear canvas
function clearBoard(){
    // Double-check
    if(confirm("Do you want to clear the whiteboard?")){
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        if(TogetherJS.running){ // Send to other clients
            TogetherJS.send({
                type : "clear"
            });
        }
    }
}

/* 
Parameters:
ex : event x (number)
ey : event y (number)
pex : previous event x (number)
pey : previous event y (number)
remote : if the call is local or from another client (boolean)
colour : the colour to draw with
size : the size to draw with
tool : brush or eraser
*/
function draw(ex, ey, pex, pey, remote, colour, size, tool){
    canvasContext.lineCap = "round";

    // If mouse is up and the call is local, return
    if(!mousePressed && !remote)
        return;

    // Draws a white line, erasing the stroke, and the width is dependant on what is picked
    if(tool === "eraser"){
        canvasContext.strokeStyle = "#ffffff";
        canvasContext.lineWidth = size;
    }
    // Draws a line, and the color and width values are dependant on what is picked
    else if(tool === "brush"){
        canvasContext.strokeStyle = colour;
        canvasContext.lineWidth = size;
    }

    // Begin path, draw line
    canvasContext.beginPath();
    canvasContext.moveTo(pex, pey); // Start at anchored point
    canvasContext.lineTo(ex, ey); // Move to current mouse position
    canvasContext.fill();
    canvasContext.stroke();

    // Send draw to other clients
    if(!remote){
        if(TogetherJS.running){
            TogetherJS.send({
                type : "draw",
                ex : ex, // Current X
                ey : ey, // Current Y
                pex : pex, // Previous X
                pey : pey, // Previous Y
                remote : true, // Remote draw call
                colour : colour, // Draw colour
                size : size, // Stroke size
                tool : tool // Tool
            });
        }
    }
}
