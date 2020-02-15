// Add JS Here

TogetherJS(document.getElementById("whiteboard"));

var canvas = document.getElementById("whiteboard");
var canvasContext = canvas.getContext("2d");
var mousePressed = false;

w = canvas.width;
h = canvas.height;

canvas.addEventListener("mousedown", alert("j"), false);
$('#whiteboard').mousedown(function (e) {
    mousePressed = true;
    alert("h");
    Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
});
$('#whiteboard').mousemove(function (e) {
    if (mousePressed) {
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
    }
});
$('#whiteboard').mouseup(function (e) {
    mousePressed = false;
});
$('#whiteboard').mouseleave(function (e) {
    mousePressed = false;
});

function Draw(x, y, isDown) {
    alert("f");
    if (isDown) {
        canvasContext.beginPath();
        canvasContext.strokeStyle = $('#selColor').val();
        canvasContext.lineWidth = $('#selWidth').val();
        canvasContext.lineJoin = "round";
        canvasContext.moveTo(lastX, lastY);
        canvasContext.lineTo(x, y);
        canvasContext.closePath();
        canvasContext.stroke();
    }
    lastX = x; lastY = y;
}