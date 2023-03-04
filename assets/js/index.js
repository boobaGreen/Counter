function windowResize() {
  let h = document.getElementById("design-area").clientHeight; // la dimensione senza barre page-up/dw
  let w = document.getElementById("design-area").clientWidth;
  console.log(h);
  console.log(w);
  document.getElementById("paint-area").style.width = w + "px";
  document.getElementById("paint-area").style.height = h + "px";
}

window.addEventListener("resize", windowResize);
windowResize();
