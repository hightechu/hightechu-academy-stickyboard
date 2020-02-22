// Add JS Here

TogetherJS(this);

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

// Receive canvas image on join
TogetherJS.hub.on("init", function (msg) {
    if (! msg.sameUrl) {
        return;
    }
    var image = new Image();
    image.src = msg.image;
    canvasContext.drawImage(image, 0, 0);
});

// Send canvas image on client join
TogetherJS.hub.on("togetherjs.hello", function(msg){
    if(!msg.sameUrl){
        return;
    }
    
    var image = canvas.toDataURL("image/png");
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
    draw(msg.e, msg.prevCoord);
});

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
canvas.addEventListener("mousemove", 
    function(e) { 
        coord.innerText = "X: " + e.offsetX + " || Y: " + e.offsetY;
        if(mousePressed){
            draw(e, prevCoord); 
        }
        prevCoord = [e.offsetX, e.offsetY];

        // Send draw to other clients
        if(TogetherJS.running){
            TogetherJS.send({
                type : "draw",
                e : e,
                prevCoord : prevCoord
            });
        }
    });

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

function draw(e, prevCoord){
    var x = e.offsetX;
    var y = e.offsetY;
    canvasContext.lineCap = "round";

    if(!mousePressed)
        return;

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
}