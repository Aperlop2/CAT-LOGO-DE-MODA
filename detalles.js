function getParam(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

const id = getParam("id");
const data = VESTIDOS[id];

const imgMain = document.getElementById("imgMain");
const thumbs = document.getElementById("thumbs");
const valueBox = document.getElementById("valueBox");
const nombreVestido = document.getElementById("nombreVestido");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let indexImg = 0;
let currentTab = "talla";

function renderValue(){
  if(!data) return;
  if(currentTab === "talla") valueBox.textContent = data.talla;
  if(currentTab === "modelo") valueBox.textContent = data.modelo;
  if(currentTab === "color") valueBox.textContent = data.color;
}

function setMainImage(i){
  if(!data) return;
  indexImg = i;
  imgMain.src = data.imagenes[indexImg];

  // marcar thumb activo
  [...thumbs.querySelectorAll("img")].forEach((t, idx) => {
    t.classList.toggle("active", idx === indexImg);
  });
}

function buildThumbs(){
  thumbs.innerHTML = "";
  data.imagenes.forEach((src, i) => {
    const t = document.createElement("img");
    t.src = src;
    t.alt = data.nombre + " miniatura " + (i+1);
    t.addEventListener("click", () => setMainImage(i));
    thumbs.appendChild(t);
  });
}

function initTabs(){
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      tabs.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentTab = btn.dataset.tab;
      renderValue();
    });
  });
}

function initArrows(){
  prevBtn.addEventListener("click", () => {
    const n = data.imagenes.length;
    setMainImage((indexImg - 1 + n) % n);
  });
  nextBtn.addEventListener("click", () => {
    const n = data.imagenes.length;
    setMainImage((indexImg + 1) % n);
  });
}

if(!data){
  // si llega sin id o id no existe
  document.querySelector(".container").innerHTML = `
    <div class="alert alert-warning mt-4">
      No se encontró el modelo. Regresa al <a href="modelos.html">catálogo</a>.
    </div>
  `;
} else {
  nombreVestido.textContent = data.nombre;
  buildThumbs();
  setMainImage(0);
  initTabs();
  initArrows();
  renderValue();
}
