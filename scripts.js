function menus(){
    let element = document.getElementById("activacion-menus")
    element.classList.toggle("menu-movil")
}
function nav(){
    let element = document.getElementById("nav-fixed")
    element.classList.toggle("menu-nav")
}
function mostrasmas(){
    let element = document.getElementById("mostrar-p")
    element.classList.toggle("height-p")
}
function bloqbody(){
    let element = document.getElementById("bloq-hiden")
    element.classList.toggle("class-bloq")
}
function bloqmain(){
    let element = document.getElementById("main-bloq")
    element.classList.toggle("class-main")
}


/*suits boton de mostrar mas y giro del boton*/
function activable(){
    let element = document.getElementById("activable-imple")
    element.classList.toggle("active-imple")
}

function boton(){
    let element = document.getElementById("butn")
    element.classList.toggle("active-btn")
}
function leermas(){
    let element = document.getElementById("parrafo-ext")
    element.classList.toggle("height-parrafo")
}



document.addEventListener("DOMContentLoaded", () => {
    const zoomables = document.querySelectorAll(".zoomable");

    zoomables.forEach(img => {
        img.addEventListener("click", () => {
            // Crear overlay
            const overlay = document.createElement("div");
            overlay.classList.add("img-overlay");

            // Imagen clonada
            const bigImg = document.createElement("img");
            bigImg.src = img.src;
            bigImg.alt = img.alt;

            overlay.appendChild(bigImg);
            document.body.appendChild(overlay);

            // Al hacer clic en el overlay se cierra
            overlay.addEventListener("click", () => {
                overlay.remove();
            });
        });
    });
});







// ---------- DOM ----------
const suitSelect = document.getElementById("suit");
const entrada = document.getElementById("entrada");
const salida = document.getElementById("salida");
const totalDiv = document.getElementById("total");
const detalleDiv = document.getElementById("detalle"); // <- asegúrate que exista en el HTML
const imageContainer = document.getElementById("imageContainer");
const form = document.getElementById("reservaForm");

// 🔗 Imágenes por suit (reemplaza las URLs por las reales)
const suitImages = {
  1: "assets/suits/suit1/imagen1.jpeg",
  2: "assets/suits/suit2/image3.jpeg",
  3: "assets/suits/suit3/image1.jpeg",
  4: "assets/suits/suit4/image1.jpeg",
  5: "assets/suits/suit5/image1.jpeg",
};

// 💵 Tipo de cambio del dólar
const exchangeRate = 3.5; // 👈 Aquí cambia el tipo de cambio cuando lo necesites

// ---------- helpers ----------
function nightsBetween(startDate, endDate) {
  // calcula noches completas entre fechas usando UTC (evita problemas DST y decimales)
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const startUTC = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const endUTC = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  return Math.floor((endUTC - startUTC) / MS_PER_DAY); // noches enteras
}

// Retorna un objeto con detalle y total
function calcularPrecio() {
  // validaciones básicas
  if (!entrada.value || !salida.value) {
    totalDiv.textContent = "Reserva será de: S/ 0";
    detalleDiv.textContent = "";
    return null;
  }

  const start = new Date(entrada.value);
  const end = new Date(salida.value);
  const days = nightsBetween(start, end);

  if (isNaN(days) || days <= 0) {
    totalDiv.textContent = "Selecciona fechas válidas (salida > entrada)";
    detalleDiv.textContent = "";
    return null;
  }

  let total = 0;
  let detalle = "";

  if (days > 30) {
    const extraDays = days - 30;
    const precio30 = 1000 * exchangeRate;          // 1000 USD convertidos a soles
    const precioExtra = extraDays * 200;           // S/200 por noche extra
    total = precio30 + precioExtra;

    detalle = `30 días: S/ ${precio30.toFixed(2)} (1,000 USD × S/${exchangeRate}) + ${extraDays} días extra: S/ ${precioExtra.toFixed(2)} → Total: S/ ${total.toFixed(2)}`;
  } else {
    total = days * 200;
    detalle = `${days} noche(s) × S/ 200 = S/ ${total.toFixed(2)}`;
  }

  totalDiv.textContent = `Reserva será de: S/ ${total.toFixed(2)}`;
  detalleDiv.textContent = detalle;

  return { total, days, detalle, precio30: (days>30? (1000*exchangeRate) : null) };
}

// ---------- listeners ----------
suitSelect.addEventListener("change", () => {
  const selected = suitSelect.value;
  if (suitImages[selected]) {
    imageContainer.style.backgroundImage = `url(${suitImages[selected]})`;
  } else {
    imageContainer.style.backgroundImage = "";
  }
  calcularPrecio();
});

entrada.addEventListener("change", calcularPrecio);
salida.addEventListener("change", calcularPrecio);

// Enviar correo (mailto en móvil, Gmail web en PC)
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const whatsapp = document.getElementById("whatsapp").value.trim();
  const suit = suitSelect.options[suitSelect.selectedIndex].text;
  const start = entrada.value;
  const end = salida.value;

  const calc = calcularPrecio();
  if (!calc) {
    alert("Por favor selecciona fechas válidas y una suite.");
    return;
  }

  const subject = `Reserva de ${suit}`;
  // cuerpo con el detalle incluido
  const bodyLines = [
    "Estimados,",
    "",
    `Mi nombre es ${nombre}`,
    `WhatsApp: ${whatsapp}`,
    "",
    `Estoy interesado en reservar: ${suit}`,
    `Fechas: ${start} a ${end} (${calc.days} noches)`,
    "",
    "Desglose:",
    calc.detalle,
    "",
    `Total estimado: S/ ${calc.total.toFixed(2)}`,
    "",
    "Muchas gracias."
  ];
  const body = bodyLines.join("\n");

  const email = "mariofigueroa9@hotmail.com";

  if (window.innerWidth <= 820) {
    // Móvil -> mailto
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  } else {
    // PC -> Gmail web
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      "_blank"
    );
  }
});
