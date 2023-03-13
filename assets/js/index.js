function drawing_sky() {
  var c = document.getElementById("sky");
  c.style.position = "absolute";
  c.style.zIndex = "-1"; // prova!!!!!!!!!!!!!!!

  var ctx = c.getContext("2d");
  var xMax = (c.width = window.screen.availWidth);
  console.log(xMax);
  var yMax = (c.height = window.screen.availHeight);

  var hmTimes = Math.round(xMax + yMax) / 3; // quantita' stelle rispetto ai lati di base Math.round(xMax + yMax)
  let yMaxCapped = (yMax / 3) * 1.8; // aggiunta da me per limitare il cielo ad un altezza minima cappata sull orizzonte
  for (var i = 0; i <= hmTimes; i++) {
    var randomX = Math.floor(Math.random() * xMax + 1); //calcolo x random xMax original
    var randomY = Math.floor(Math.random() * yMaxCapped + 1); //calcolo y random xMax original
    var randomSize = Math.floor(Math.random() * 2 + 1);
    var randomOpacityOne = Math.floor(Math.random() * 9 + 1);
    var randomOpacityTwo = Math.floor(Math.random() * 9 + 1);
    var randomHue = Math.floor(Math.random() * 360 + 1);
    if (randomSize > 1) {
      ctx.shadowBlur = Math.floor(Math.random() * 10 + 5);
      ctx.shadowColor = "white";
    }
    ctx.fillStyle =
      "hsla(" +
      randomHue +
      ", 30%, 80%, ." +
      randomOpacityOne +
      randomOpacityTwo +
      ")";
    ctx.fillRect(randomX, randomY, randomSize, randomSize);
  }
}

function drawing_ground() {
  var c = document.getElementById("ground");
  c.style.zIndex = "-1"; // prova!!!!!!!!!!!!!!!
  var ctx = c.getContext("2d");

  wground = document.documentElement.clientWidth;
  hground = Math.trunc(wground / 5.727891156462585);
  c.width = wground;
  //console.log(w, "w");
  //console.log(h, "h");
  //quote 842/147 original size ground =5,7278911564625850
  c.height = hground;
  //console.log(c.height);
  const img = new Image();
  img.onload = () => {
    //ctx.clearRect(0, 0, xMax, yMax); // pulizia ground precedente se necessario
    c.style.position = "absolute";
    c.style.bottom = 0 + "px"; // posizione ground dal basso
    c.style.left = 0 + "px"; // posizione ground da sx
    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    ctx.drawImage(img, 0, 147, 842, -147, 0, 0, wground, c.height);
  };
  img.src = "assets/img/groundtransp.png"; //sorgente foto groundtransparent
}
function drawing_sheep(frame, bottom, left) {
  var c = document.getElementById("sheep");
  c.style.zIndex = "-1"; // prova!!!!!!!!!!!!!!!
  var ctx = c.getContext("2d");
  //842/121=6,9586776859504132231404958677686 original pecorelle ratio
  var wwindows = document.documentElement.clientWidth;
  var w = Math.trunc(wwindows / 6.9586776859504132231404958677686);
  var h = w;
  c.height = h;
  c.width = w;
  const img = new Image();
  img.onload = () => {
    //ctx.clearRect(0, 0, xMax, yMax); // pulizia pecora precedente se necessario
    c.style.position = "absolute";
    c.style.bottom = bottom + "px"; // posizione pecora dal basso PASSATA in func
    c.style.left = left + "px"; // posizione pecora da sx PASSATA in func
    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    ctx.drawImage(img, frame * 121, 0, 121, 121, 0, 0, w, h);
  };
  img.src = "assets/img/whitetransppeco.png"; //sorgente foto groundtransparent
}
//////////////// da togliere sleep
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function sheepx(frame) {
  var wwindows2 = document.documentElement.clientWidth;
  var w2 = Math.trunc(wwindows2) / 7;
  return frame * w2;
}
function draw_button() {
  const ksizefontbutton = 8; // piu e' alta piu i buttoni sono piccoli
  var h2 = Math.trunc(document.documentElement.clientHeight);
  var w2 = Math.trunc(document.documentElement.clientWidth);
  if (w2 <= h2) {
    minimo = w2;
  } else {
    minimo = h2;
  }
  /////////////////////////BTN 1
  const createButtonDec = document.createElement("a");
  let str = "\u2212"; // segno meno per averlo centrato
  createButtonDec.innerText = str;
  const ParentDiv = document.querySelector(".buttons");
  createButtonDec.id = "btndec";
  createButtonDec.className += "btn btn-2";
  createButtonDec.position = "relative";
  createButtonDec.style.fontSize = Math.trunc(minimo / ksizefontbutton) + "px";
  ParentDiv.appendChild(createButtonDec);
  /////////////////////////BTN 2
  const createButtonRst = document.createElement("a");
  createButtonRst.id = "btnrst";
  createButtonRst.innerText = "R";
  createButtonRst.className += "btn btn-2";
  createButtonRst.position = "relative";
  createButtonRst.style.fontSize = Math.trunc(minimo / ksizefontbutton) + "px";
  ParentDiv.appendChild(createButtonRst);
  /////////////////////////BTN 3
  const createButtonInc = document.createElement("a");
  createButtonInc.id = "btninc";
  createButtonInc.innerText = "+";
  createButtonInc.className += "btn btn-2";
  createButtonInc.position = "relative";
  createButtonInc.style.fontSize = Math.trunc(minimo / ksizefontbutton) + "px";
  ParentDiv.appendChild(createButtonInc);
}
function removeBtn() {
  parent = document.querySelector("#buttons");
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function draw_counter(counter) {
  document.documentElement.clientHeight <= document.documentElement.clientWidth
    ? (minimo = document.documentElement.clientHeight)
    : (minimo = document.documentElement.clientWidth);
  const element = document.querySelector(".counter");
  element.textContent = counter.toString();
  const ksizefontbutton = 8;
  element.style.fontSize = Math.trunc(minimo / ksizefontbutton) + "px";
}
function calc_altezza(frame) {
  if (frame == 3) {
    output = hground;
  } else if (frame == 4 || frame == 2) {
    output = hground * 0.75; ////kostant
  } else {
    output = output = Math.trunc(hground / 10);
  }
  return output;
}
function beep(suono) {
  sound = new Audio("assets/audio/metro.mp3");

  sound.play();
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////  MAIN /////////////////////////////
/////drawing_sheep(PECOARRAY[frame], sheepbottom, sheepleft);
async function init() {
  const PECOARRAY = [0, 1, 2, 3, 4, 1, 0];
  let suono = "metro"; // "metro" per metro.mp3 , qualsiasi altra cosa per l'altro sound
  const lastframe = 6;

  var hwindows2 = document.documentElement.clientHeight;
  var h2 = Math.trunc(hwindows2);

  let hground;
  let wground;

  drawing_sky();
  drawing_ground();
  let frame = 0;
  let counter = 0;
  let sheepleft = sheepx(frame);
  let sheepbottom = calc_altezza(frame);
  drawing_sheep(PECOARRAY[frame], sheepbottom, sheepleft);
  draw_button();
  draw_counter(counter);

  const listdec = document.getElementById("btndec");
  listdec.addEventListener("click", function () {
    counter--;
    frame--;
    if (frame == -1) {
      frame = 6;
    }

    sheepleft = sheepx(frame);
    sheepbottom = calc_altezza(frame);
    drawing_sheep(PECOARRAY[frame], sheepbottom, sheepleft);
    draw_counter(counter);
    beep(suono);
    //se verso allora il frame zero si comporta in n modo se altro verso in un altro
  });

  const btnrstlist = document.getElementById("btnrst");
  btnrstlist.addEventListener("click", function () {
    counter = 0;
    frame = 0;
    sheepleft = sheepx(frame);
    sheepbottom = calc_altezza(frame);
    drawing_sheep(PECOARRAY[frame], sheepbottom, sheepleft);
    draw_counter(counter);
    beep(suono);
  });
  const listinc = document.getElementById("btninc");
  listinc.addEventListener("click", function () {
    counter++;
    frame++;
    if (frame == 7) {
      frame = 0;
    }
    sheepleft = sheepx(frame);
    sheepbottom = calc_altezza(frame);
    drawing_sheep(PECOARRAY[frame], sheepbottom, sheepleft);
    draw_counter(counter);
    beep(suono);
  });
  window.addEventListener("resize", function (event) {
    hwindows2 = document.documentElement.clientHeight;
    h2 = Math.trunc(hwindows2);
    drawing_sky();
    drawing_ground();
    sheepleft = sheepx(frame);
    sheepbottom = calc_altezza(frame);
    drawing_sheep(PECOARRAY[frame], sheepbottom, sheepleft);
    removeBtn();
    draw_button();
    draw_counter(counter);
  });

  /*  for (let i = 0; i < 1000; i++) {
    frame++;
    counter++; /////////////////////////prova test
    await sleep(500); //mettere qui variabile SPEED
    if (frame == 3) {
      sheepbottom = sheepbottomstart * 40;
    } else {
      ///////////////////eventuale piccolo offset minore di 3 +20 , 3 zero,maggiore di 3 -20
      if (frame == 2 || frame == 4) {
        sheepbottom = sheepbottomstart * 18;
      } else sheepbottom = sheepbottomstart;
    }
    if (frame == lastframe + 1) {
      frame = 0;
    }
    drawing_sheep(PECOARRAY[frame], sheepbottom, sheepx(frame));
    draw_counter(counter); ///////solo test
  } */
}

window.onload = init;
