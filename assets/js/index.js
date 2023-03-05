const RATIO_BKGR = 1.41512605;
let Border_Top;
let Border_Left;
let Small_H;
let Small_W;
let canvasSheep = document.getElementById("canvasSheep");
const ctx = document.getElementById("canvasSheep").getContext("2d");
const img = new Image(); // Create new img element
img.src = "/assets/img/pecorelle_t.png";
let CanvasWidth;
let CanvasHeight;
let PositionSheepFramSheet;
let SheepActualRatio;
const SheepOriginalPixel = 121;
const SheepOriginalRatio = 6.9586776859504132231404958677686;
let SheepPositionActualLeft = 20;
let SheepPositionActualBottom = 20;

function drawSheep() {
  const img = new Image();
  const offSetRiga = 0;
  const offSetColonna = 1;
  img.onload = () => {
    console.log(CanvasHeight);
    console.log(CanvasWidth);

    ctx.clearRect(0, 0, canvasSheep.width, canvasSheep.height);

    canvasSheep.style.position = "absolute";
    canvasSheep.style.bottom = SheepPositionActualBottom + "px";
    canvasSheep.style.left = SheepPositionActualLeft + "px";
    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    ctx.drawImage(
      img,
      0 + offSetColonna * SheepOriginalPixel,
      0 + offSetRiga * SheepOriginalPixel,
      SheepOriginalPixel,
      SheepOriginalPixel,
      0,
      0,
      CanvasWidth,
      CanvasHeight
    );
  };
  img.src = "/assets/img/pecorelle_t.png";
}

function windowResize() {
  let H = document.getElementById("design-area").clientHeight; // la dimensione senza barre page-up/dw
  let W = document.getElementById("design-area").clientWidth;
  console.log("Big_H :", H);
  console.log("Big_W :", W);
  let Bordi_Top = true;
  Border_Left = 0;
  let Ratio = W / H;
  if (Ratio <= RATIO_BKGR) {
    Small_W = W;
    Small_H = Math.trunc(W / RATIO_BKGR);
    Border_Top = Math.trunc((H - Small_H) / 2);
    Border_Left = 0;
  } else {
    Bordi_Top = false;
    Border_Top = 0;
    Small_W = Math.trunc(RATIO_BKGR * H);
    Small_H = H;
    Border_Left = Math.trunc((W - Small_W) / 2);
  }
  console.log("Small_H :", Small_H);
  console.log("Small_W :", Small_W);
  console.log("Border-Top: ", Border_Top);
  console.log("Border-Left: ", Border_Left);
  document.getElementById("paint-area").style.width = Small_W + "px";
  document.getElementById("paint-area").style.height = Small_H + "px";
  // div posizionao rimane un piccolo glitch ogni tanto con refresh passa tutto
  // poi iniziamo a posizionare le pecorelle
  var d = document.getElementById("paint-area");
  d.style.position = "absolute";
  d.style.left = Border_Left + "px";
  d.style.top = Border_Top + "px";

  CanvasHeight = Math.trunc(Small_W / SheepOriginalRatio);
  CanvasWidth = CanvasHeight;

  canvasSheep.width = CanvasWidth;
  canvasSheep.height = CanvasHeight;

  console.log(CanvasHeight);
  console.log(CanvasWidth);
  drawSheep();
}

function init() {
  window.addEventListener("resize", windowResize);
  windowResize();
}

window.onload = init;
