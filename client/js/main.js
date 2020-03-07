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
    draw(msg.ex, msg.ey, msg.pex, msg.pey, true); // Remote draw() call
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
            draw(mx, my, prevCoord[0], prevCoord[1], false); 

            // Send draw to other clients
            if(TogetherJS.running){
                TogetherJS.send({
                    type : "draw",
                    ex : mx, // Current X
                    ey : my, // Current Y
                    pex : prevCoord[0], // Previous X
                    pey : prevCoord[1] // Previous Y
                });
            }
        }
        prevCoord = [mx, my]; // Sets new anchor
        mousePressed = false;
    })
canvas.addEventListener("mousemove", 
    function(e) {
        mousePos(e);
        if(mousePressed){
            // Call draw() locally
            draw(mx, my, prevCoord[0], prevCoord[1], false); 

            // Send draw to other clients
            if(TogetherJS.running){
                TogetherJS.send({
                    type : "draw",
                    ex : mx, // Current X
                    ey : my, // Current Y
                    pex : prevCoord[0], // Previous X
                    pey : prevCoord[1] // Previous Y
                });
            }
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
}
function eraser(){
    tool = "eraser";
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
*/
function draw(ex, ey, pex, pey, remote){
    canvasContext.lineCap = "round";

    // If mouse is up and the call is local, return
    if(!mousePressed && !remote)
        return;

    // Draws a white line, erasing the stroke
    if(tool === "eraser"){
        canvasContext.strokeStyle = "#ffffff";
        canvasContext.lineWidth = 30;
    }
    // Draws a black line
    else if(tool === "brush"){
        canvasContext.strokeStyle = "#000000";
        canvasContext.lineWidth = 5;
    }

    // Begin path, draw line
    canvasContext.beginPath();
    canvasContext.moveTo(pex, pey); // Start at anchored point
    canvasContext.lineTo(ex, ey); // Move to current mouse position
    canvasContext.fill();
    canvasContext.stroke();
}