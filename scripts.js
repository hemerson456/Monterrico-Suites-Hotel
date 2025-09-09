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


/*logica de contacto*/
const suites = {
    1: "Suit 1: Dos camas Queen y 1 cama 1 ½. Precio desde S/200 por noche (6 huésped) + S/40 por huésped adicional.",
    2: "Suit 2: Una cama Queen, 1 cama 1 ½. Precio desde S/200 por noche (4 huésped) + S/40 por huésped adicional.",
    3: "Suit 3: Dos camas Queen, 1 cama 1 ½. Precio desde S/200 por noche (6 huésped) + S/40 por huésped adicional.",
    4: "Suit 4: Tres camas Queen. Precio desde S/200 por noche (6 huésped) + S/40 por huésped adicional.",
    5: "Suit 5: Tres camas Queen. Precio desde S/200 por noche (6 huésped) + S/40 por huésped adicional."
  };

  const suiteSelect = document.getElementById("suite");
  const suiteInfo = document.getElementById("suiteInfo");
  const fechaEntrada = document.getElementById("fechaEntrada");
  const fechaSalida = document.getElementById("fechaSalida");
  const totalReserva = document.getElementById("totalReserva");

  suiteSelect.addEventListener("change", () => {
    suiteInfo.innerText = suites[suiteSelect.value] || "Seleccione una suite para ver la información.";
  });

  function calcularTotal() {
    const entrada = new Date(fechaEntrada.value);
    const salida = new Date(fechaSalida.value);
    if (entrada && salida && salida > entrada) {
      const dias = Math.ceil((salida - entrada) / (1000 * 60 * 60 * 24));
      const total = dias * 200;
      totalReserva.innerText = `La reserva será de: S/ ${total} (${dias} noches)`;
      return { dias, total };
    } else {
      totalReserva.innerText = "La reserva será de: S/ 0";
      return { dias: 0, total: 0 };
    }
  }

  fechaEntrada.addEventListener("change", calcularTotal);
  fechaSalida.addEventListener("change", calcularTotal);

  document.getElementById("reservaForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const whatsapp = document.getElementById("whatsapp").value;
    const suite = suiteSelect.options[suiteSelect.selectedIndex].text;
    const entrada = fechaEntrada.value;
    const salida = fechaSalida.value;
    const { dias, total } = calcularTotal();

    let body = `Estimados,%0A%0A`;
    body += `Mi nombre es ${nombre}, mi número de WhatsApp es ${whatsapp}.%0A%0A`;
    body += `Estoy interesado en reservar la ${suite}.%0A`;
    body += `Fechas: desde ${entrada} hasta ${salida} (${dias} noches).%0A%0A`;
    body += `Total estimado: S/ ${total}.%0A%0A`;
    body += `Muchas gracias.%0A`;

    const subject = `Reserva de ${suite}`;
    const email = "mariofigueroa9@hotmail.com";

    // Detectar tamaño de pantalla
    if (window.innerWidth <= 820) {
      // 📱 Móvil → usar mailto
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;
    } else {
      // 💻 PC → abrir Gmail web
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${body}`,
        "_blank"
      );
    }
  });