TogetherJS(this);

// HTML elements
var canvas = document.getElementById("whiteboard");
var canvasContext = canvas.getContext("2d");
var canvasContainer = document.getElementById("whiteboardContainer");

// Vars for drawing
var mousePressed = false;
var prevCoord;
var tool = "brush";

////////////////////////////////////
// Change <div> and <canvas> size //

var width = 1000;
var height = 600;

//                                //
////////////////////////////////////

canvasContainer.style.width = String(width) + "px";
canvasContainer.style.height = String(height) + "px";
canvas.width = width;
canvas.height = height;

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

// Event listeners
canvas.addEventListener("mousedown", 
    function(e) { 
        prevCoord = [e.offsetX, e.offsetY]; // Sets "anchor" for drawing
        mousePressed = mouseDown(); 
    });
canvas.addEventListener("mouseup", 
    function(e) {
        // Finish the line
        canvasContext.fill();
        canvasContext.stroke();
        mousePressed = mouseUp(); 
    });
canvas.addEventListener("mouseleave", function(e) { mousePressed = mouseUp(); })
canvas.addEventListener("mousemove", 
    function(e) {
        if(mousePressed){
            // Call draw() locally
            draw(e.offsetX, e.offsetY, prevCoord[0], prevCoord[1], false); 

            // Send draw to other clients
            if(TogetherJS.running){
                TogetherJS.send({
                    type : "draw",
                    ex : e.offsetX, // Current X
                    ey : e.offsetY, // Current Y
                    pex : prevCoord[0], // Previous X
                    pey : prevCoord[1] // Previous Y
                });
            }
        }
        prevCoord = [e.offsetX, e.offsetY]; // Sets new anchor
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