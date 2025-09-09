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