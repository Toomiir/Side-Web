const API_URL = "https://684aeef2165d05c5d35ae4a6.mockapi.io/side/Personas";
const contenedor = document.getElementById("buscados");
const buscador = document.getElementById("buscador");
const template = document.getElementById("card-template");

let fugitivos = [];

async function obtenerDatos() {
  try {
    const res = await fetch(API_URL);
    fugitivos = await res.json();
    renderizarFugitivos(fugitivos);
  } catch (err) {
    contenedor.innerHTML = "<p>Error al cargar los datos.</p>";
    console.error("Error:", err);
  }
}

function renderizarFugitivos(lista) {
  contenedor.innerHTML = "";
  lista.forEach(f => {
    const card = template.content.cloneNode(true);
    card.querySelector("img").src = `https://i.pravatar.cc/100?u=${f.id}`;
    card.querySelector("img").alt = f.nombre;
    card.querySelector("h4").textContent = f.nombre;
    card.querySelector(".cargos").textContent = `Cargos: ${f.cargos || "N/A"}`;
    card.querySelector(".pais").textContent = `Nacionalidad: ${f.nacionalidad || "Desconocido"}`;
    card.querySelector(".sexo").textContent = `Sexo: ${f.sexo|| "Desconocido"}`;
    
    contenedor.appendChild(card);
  });
}

buscador.addEventListener("input", () => {
  const texto = buscador.value.toLowerCase();
  const filtrados = fugitivos.filter(f =>
    f.nombre.toLowerCase().includes(texto) ||
    (f.crimen && f.crimen.toLowerCase().includes(texto)) ||
    (f.nacionalidad && f.nacionalidad.toLowerCase().includes(texto))
  );
  renderizarFugitivos(filtrados);
});

obtenerDatos();
