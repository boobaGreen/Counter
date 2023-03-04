let cw;
let ch;
let sheep_x = 20 + "px";
let sheep_y = 50 + "px";
let frameWidth = 120;
let frameHeight = 120;
let canvas;
let ctx;

function letresize() {
  let w = window.innerWidth;
  let h = window.innerHeight;
  h1 = Math.trunc((h / 100) * 98);
  w1 = Math.trunc(h * 1.42);
  let div = document.getElementById("area-disegno");
  div.style.height = h1 + "px";
  div.style.width = w1 + "px";
  div.style.border = "2px dotted red";
  let cw = Math.trunc(w1 / 5);
  let ch = Math.trunc(h1 / 5);

  canvas.width = ch;
  canvas.height = ch;
  console.log("cw", cw);
  console.log("ch", ch);
  canvas.style.left = sheep_x;
  canvas.style.bottom = sheep_y;
  canvas.style.position = "absolute";
}

function drawImageActualSize() {
  let row = 0;
  let column = 0;

  img.addEventListener("load", function () {
    ctx.drawImage(
      image,
      column * frameWidth,
      row * frameHeight,
      frameWidth,
      frameHeight,
      0,
      0,
      frameWidth,
      frameHeight
    );
  });
}

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

let image = new Image(); // Using optional size for image
// Draw when image has loaded

// Load an image of intrinsic size 300x227 in CSS pixels
image.src = "/assets/img/pecorelle.png";

window.addEventListener("resize", letresize);
letresize();
