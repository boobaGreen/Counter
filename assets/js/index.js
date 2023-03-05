const RATIO_BKGR = 1.41512605;
let Border_Top;
let Border_Left;
let Small_H;
let Small_W;
let newBtna;
let newBtnb;
let newBtnc;
let primoGiro = true;

const img = new Image(); // Create new img element
img.src = "/assets/img/pecorelle_t.png";
let CanvasWidth;
let CanvasHeight;
let PositionSheepFrameSheet = 0;
let SheepActualRatio;
const SheepOriginalPixel = 121;
const SheepOriginalRatio = 6.9586776859504132231404958677686;
let SheepPositionActualLeft = 20;
let SheepPositionActualBottom = 20;
let W, H;
const PositionSheepFrameSheetSelect = [1, 0, 1, 2, 3, 4, 1, 0, 1];
let actualFrame = 0;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function drawSheep() {
  let canvasSheep = document.getElementById("canvasSheep");
  const ctx = document.getElementById("canvasSheep").getContext("2d");
  const img = new Image();
  const offSetRiga = 0;
  const offSetColonna = PositionSheepFrameSheetSelect[actualFrame];
  img.onload = () => {
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

  if (actualFrame > 4) {
    SheepPositionActualBottom = 20; // da mettre calcolo
  }
}
function drawBtn() {
  // let btn = document.createElement("button");
  // btn.innerText = "Inc";
  // document.body.appendChild(btn);

  let fs = Math.round((W / 250) * 10) / 10;
  if (primoGiro) {
    newBtna = document.createElement("button");
    newBtna.id = "btnDec";
    newBtna.innerText = "-";
    newBtna.className = "btnact";
    document.querySelector("#dec").appendChild(newBtna);
    newBtnb = document.createElement("button");
    newBtnb.id = "btnRst";
    newBtnb.innerText = "Reset";
    newBtnb.className = "btnact";
    document.querySelector("#rst").appendChild(newBtnb);
    newBtnc = document.createElement("button");
    newBtnc.className = "btnact";
    newBtnc.id = "btnInc";
    newBtnc.innerText = "+";
    document.querySelector("#inc").appendChild(newBtnc);
    primoGiro = false;
  }

  newBtna.style.fontSize = fs + "rem";

  newBtnb.style.fontSize = fs + "rem";

  newBtnc.style.fontSize = fs + "rem";
}
function windowResize() {
  H = document.getElementById("designArea").clientHeight; // la dimensione senza barre page-up/dw
  W = document.getElementById("designArea").clientWidth;
  console.log("Big_H :", H);
  console.log("Big_W :", W);

  Border_Left = 0;
  let Ratio = W / H;
  if (Ratio <= RATIO_BKGR) {
    Small_W = W;
    Small_H = Math.trunc(W / RATIO_BKGR);
    Border_Top = Math.trunc((H - Small_H) / 2);
    Border_Left = 0;
  } else {
    Border_Top = 0;
    Small_W = Math.trunc(RATIO_BKGR * H);
    Small_H = H;
    Border_Left = Math.trunc((W - Small_W) / 2);
  }
  console.log("Small_H :", Small_H);
  console.log("Small_W :", Small_W);
  console.log("Border-Top: ", Border_Top);
  console.log("Border-Left: ", Border_Left);
  document.getElementById("paintArea").style.width = Small_W + "px";
  document.getElementById("paintArea").style.height = Small_H + "px";

  var d = document.getElementById("paintArea");
  d.style.position = "absolute";
  d.style.left = Border_Left + "px";
  d.style.top = Border_Top + "px";

  CanvasHeight = Math.trunc(Small_W / SheepOriginalRatio);
  CanvasWidth = CanvasHeight;

  canvasSheep.width = CanvasWidth;
  canvasSheep.height = CanvasHeight;

  console.log(CanvasHeight);
  console.log(CanvasWidth);
  let fs = Math.round((W / 250) * 10) / 10;
  drawSheep();
  drawBtn();
}

async function init() {
  window.addEventListener("resize", windowResize);
  windowResize();

  for (let i = 0; i < 8; i++) {
    actualFrame++;
    await sleep(500);
    if (actualFrame == 0) {
      windowResize();
    } else {
      if (actualFrame == 4) {
        SheepPositionActualBottom = Small_H / 5;
      }
      SheepPositionActualLeft = actualFrame * (Small_W / 10) + 20;
    }

    windowResize();
  }
}
window.onload = init;
