/* Declarando las secciones para crear de forma dinamica las opciones y no hacerlo en cada html*/
var sectionsData = [{
    id: "news",
    url: "index.html#news",
    name: "Novedades"
}, {
    id: "redes",
    url: "index.html#redes",
    name: "Redes Sociales - Facebook - Instagram"
}, {
    id: "acuerdo_conf",
    url: "news.html#acuerdo_conf",
    name: "Acuerdo de confidencialidad"
}, {
    id: "cuidado_pali",
    url: "news.html#cuidado_pali",
    name: "Cuidados Paliativos"
}, {
    id: "mision_vision",
    url: "institution.html#mision_vision",
    name: "Misión y Visión"
}, {
    id: "autoridades",
    url: "institution.html#autoridades",
    name: "Autoridades médicas"
}, {
    id: "contacto",
    url: "institution.html#contacto",
    name: "Contacto"
}, {
    id: "donate",
    url: "institution.html#donate",
    name: "Doná Sangre - Donate"
}, {
    id: "fisio",
    url: "information.html#fisio",
    name: "Fisioterapia para personas afectadas por COVID-19"
}, {
    id: "medicos_ref",
    url: "doctors.html#medicos_ref",
    name: "Médicos Referentes"
}, {
    id: "medicos",
    url: "doctors.html#medicos",
    name: "Horario Médico"
}, {
    id: "services",
    url: "services.html#services",
    name: "Servicios"
}, {
    id: "tasas",
    url: "tasas.html#tasas",
    name: "Tasas"
}, {
    id: "",
    url: "https://reservaweb.camsor.com.uy/",
    name: "Reserva Web"
}, {
    id: "",
    url: "web.html",
    name: "Manual Reserva Web"
}, {
    id: "",
    url: "violence.html",
    name: "Violencia Doméstica"
}, {
    id: "",
    url: "https://mi.iduruguay.gub.uy/login?process_state=ToEFXqMfU3Whxevo8aubOfQmBeN6HE97W4G-MQZIPyA",
    name: "Historia Clínica Digital"
}];

document.getElementById("icon-search").addEventListener('click', display_search);
document.getElementById("cover-ctn-search").addEventListener("click", hidden_search);

const bars_search = document.getElementById("ctn-bars-search");
const cover_ctn_search = document.getElementById("cover-ctn-search");
const input_search = document.getElementById("input-search");
const box_search = document.getElementById("box-search");
const sections = document.getElementsByTagName("section");
const check_all = document.getElementById("check-all");
const check_search = document.getElementById("check-search");
liTag = '';

/* Obtener el nombre de la pagina actual para no crearlo con el link y que haga la busqueda por id*/
function namePage() {
    var absoluteRoute = self.location.href;
    var page = absoluteRoute.lastIndexOf("/");
    var relativeRoute = absoluteRoute.substring(page + "/".length, absoluteRoute.length);
    return relativeRoute;
}

/* Leer los datos de la variable sectionsData y comparar si es la pagina actual*/
for (var i = 0; i < sectionsData.length; i++) {
    pageHTML = sectionsData[i].url.split('#');

    if (pageHTML[0] == namePage()) {
        /* Si es la misma que la pagina actual se crea el ancla con el name */
        liTag += `<li><a name= ${sectionsData[i].id}><i class="fas fa-search"></i> ${sectionsData[i].name} </a></li>`;
        box_search.innerHTML = liTag;
    } else {
        /* Si es distino el ancla se crea con el href indicando la url*/
        liTag += `<li><a href= ${sectionsData[i].url}><i class="fas fa-search"></i> ${sectionsData[i].name} </a></li>`;
        box_search.innerHTML = liTag;
    }
}

/*********************************************/
/******** Mostrar el buscador ***************/
/*******************************************/
function display_search() {
    bars_search.classList.toggle("display");
    cover_ctn_search.classList.toggle("display");
    check_all.style.display = "none";
    check_search.checked = true;
    input_search.focus();
    input_search.value = "";

    if (input_search.value == "") {
        box_search.style.display = "none";
    }
}

/*********************************************/
/******** Ocultar el buscador ***************/
/*******************************************/
function hidden_search() {
    bars_search.classList.toggle("display");
    cover_ctn_search.classList.toggle("display");
    input_search.value = "";
    box_search.style.display = "inherit";
}

/*********************************************/
/******** Filtro del buscador ***************/
/*******************************************/
document.getElementById("input-search").addEventListener("keyup", search);

function search() {
    // 'Mostramos' todas las secciones para poder filtrar
    check_search.checked = true;
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = "block";
    }

    var filter = input_search.value.toUpperCase();
    const li = box_search.getElementsByTagName("li"); // Obtengo las sugerencias

    // Recorriendo elementos a filtrar
    for (var i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0]; // Obtenemos los elementos a
        textValue = a.textContent || a.innerText;

        if (textValue.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "block"; // Se muestran las sugerencias
            box_search.style.display = "inherit"; // Muestra las coincidencias

            if (input_search.value == "") {
                box_search.style.display = "none"; // Si el campo esta vacio se oculta
            }

        } else {
            li[i].style.display = "none"; // Sugerencias que no coinciden se ocultan
        };
    };
}

/*********************************************/
/******** Sugerencia desplegada *************/
/*******************************************/
const li_box_search = box_search.querySelectorAll("li");

for (li of li_box_search) {
    li.addEventListener("click", function (event) {
        var id_section = '';
        id_section = event.target.name; // Id de la seccion seleccionada

        bars_search.classList.toggle("display"); // Se oculta la barra de busqueda
        cover_ctn_search.classList.toggle("display"); // Se oculta la cobertura negra

        hidden_sections(id_section);
    });
}

// Ocultamos todas las secciones menos la del id seleccionado
function hidden_sections(id_section) {
    check_all.style.display = "inherit"; // Se muestra el checkbox Todas
    check_search.checked = false; // Se pone en falso ya que se aplica el filtro

    for (var i = 0; i < sections.length; i++) {
        if (sections[i].id != id_section) {
            sections[i].style.display = "none";
        }
    }
}

// Si esta cliqueado el checkbox se oculta y muestra todas las secciones
check_search.addEventListener("click", display_sections);

function display_sections() {
    if (check_search.checked == true) {
        check_all.style.display = "none";
        for (var i = 0; i < sections.length; i++) {
            sections[i].style.display = "block";
        }
    } else {
        check_all.style.display = "inherit";
    }
}