var slidePosition = 1;
SlideShow(slidePosition);

// forward/Back controls
function plusSlides(n) {
  SlideShow(slidePosition += n);
}

//  images controls
function currentSlide(n) {
  SlideShow(slidePosition = n);
}

function SlideShow(n) {
  var i;
  var slides = document.getElementsByClassName("Containers");
  var circles = document.getElementsByClassName("dots");
  if (n > slides.length) {slidePosition = 1}
  if (n < 1) {slidePosition = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < circles.length; i++) {
      circles[i].className = circles[i].className.replace(" enable", "");
  }
  slides[slidePosition-1].style.display = "block";
  circles[slidePosition-1].className += " enable";
} 

const blueButton = document.querySelector(".blue-button");

function changeToOrange(){
    blueButton.style.backgroundColor = "orange";}


const redButton = document.querySelector(".red-button");

function changeToGreen(){
    redButton.style.backgroundColor = "green";}


const yellowButton = document.querySelector(".yellow-button");

function changeToPurple(){
    yellowButton.style.backgroundColor = "purple";}



    context = document.getElementById('letsPaint').getContext("2d");
let curColor = "#FF00CC";
let clickColor = new Array();
let brushThickness = 50;
let clickThickness = new Array();
let imageUrl =
"https://i.postimg.cc/DwNGYtCv/Horse.jpg"
let outlineImage = new Image();
$('.brushIcon').css('color',curColor);
$( "#colourPicker" ).change(function() {
  curColor = $(this).val();
  $('.brushIcon').css('color',curColor);
});
$( "#eraser" ).click(function() {
  curColor = "#FFFFFF";
});
$( "#thickness" ).change(function() {
 brushThickness = $(this).val();
});
let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();
let paint;
outlineImage.src = imageUrl;
redraw();
$('#lynne-imageSelector img').click(function(){
  imageUrl = $(this).attr('src');
  outlineImage.src = imageUrl;
  redraw();
});
$('#clear').click(function(){
    if (confirm("Are you sure you want to delete your drawing?") == true) {
       context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      clickX = [];
      clickY = [];
      clickDrag = [];
      clickColor = [];
      clickThickness = [];
       context.drawImage(outlineImage, 0, 0, context.canvas.width, context.canvas.height);
    } else {
        return false;
    }
});
$('#download').click(function(){
  let link = document.getElementById("download")
  link.href = document.getElementById('letsPaint').toDataURL();
 link.download = 'test.jpg';
});
function addClick(x, y, dragging)
{
  outlineImage.src = imageUrl;
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(curColor);
  clickThickness.push(brushThickness);
 }
$('#letsPaint').bind( "touchstart", function(e){
         let mouseX = e.pageX - this.offsetLeft;
  let mouseY = e.pageY - this.offsetTop;
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});
// For Touch
let canvas = document.getElementById("letsPaint");
// Set up touch events for mobile, etc
canvas.addEventListener("touchstart", function (e) {
        mousePos = getTouchPos(canvas, e);
  let touch = e.touches[0];
  let mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (e) {
  let mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (e) {
  let touch = e.touches[0];
  let mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);
// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  let rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}
$('#letsPaint').mousedown(function(e){
  let mouseX = e.pageX - this.offsetLeft;
  let mouseY = e.pageY - this.offsetTop;
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});
$('#letsPaint').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});
$('#letsPaint').mouseup(function(e){
  paint = false;
});
// $('#letsPaint').mouseleave(function(e){
//   paint = false;
// });
function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
 // context.strokeStyle = paintColour;
  context.lineJoin = "round";
  // context.lineWidth = brushThickness;
  for(let i=0; i < clickX.length; i++) {
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.strokeStyle = clickColor[i];
     context.lineWidth = clickThickness[i];
     context.stroke();
  }
  context.drawImage(outlineImage, 0, 0, context.canvas.width, context.canvas.height);
}
