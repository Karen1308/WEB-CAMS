/*********************************************/
/*********** Ordenar la tabla  **************/
/*******************************************/
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("table-doctors");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

/*********************************************/
/******** Paginación para la tabla **********/
/*******************************************/
function createPagination(tableName, itemsPerPage, page, pagination) {
  let liTag = '';
  let activeLi;
  let beforePage = page - 1;
  let afterPage = page + 1;
  let pages = 0;
  let numberRowPage;

  // Cantidad de botones según filas por página
  const rows = document.getElementById(tableName).rows; // Cantidad de filas en la tabla
  let records = (rows.length - 1);
  pages = Math.ceil(records / itemsPerPage); // Cantidad de páginas necesarias

  // Asignando id para mostrar las lineas según cantidad por página
  for (var j = 1; j <= pages; j++) {
    var i = j * itemsPerPage - itemsPerPage;
    if (i == 0) {
      i = i + 1;
    }

    for (i; i < j * itemsPerPage; i++) {
      if (i < rows.length) {
        rows[i].setAttribute('name', "page" + j);
        numberRowPage = rows[i].getAttribute('name');
        if (numberRowPage.substring(4) > page) {
          rows[i].style.display = "none";
        }
      } else {
        break;
      }
    }
  }

  if (page >= 1) { // Se añade el li 'Previo'
    liTag += `<li class="btn prev" onclick="prev()" disabled><span><i class="fas fa-chevron-left"></i> Previo </span></li>`;
  }

  // Páginas o li antes de la actual
  if (page == pages) {
    beforePage = beforePage - 2;
  } else if (page == pages - 1) {
    beforePage = beforePage - 1;
  }

  //Páginas o li después de la actual
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }

  for (var page_length = beforePage; page_length <= afterPage; page_length++) {
    if (page_length > pages) {
      continue;
    }

    if (page_length == 0) { // Para que no llegue a 0
      page_length = page_length + 1;
    }

    if (page == page_length) { // Se agrega la clase activa
      activeLi = "active";
    } else {
      activeLi = "";
    }
    liTag += `<li id="page${page_length}" class="numb ${activeLi}" onclick="filterPage(${page_length})"><span>${page_length}</span></li>`;
  }

  if (page < pages) { // Se añade el li 'Siguiente'
    liTag += `<li class="btn next" onclick="next()"><span> Siguiente <i class="fas fa-chevron-right"></i></span></li>`;
  }

  // Referencia al elemento de la paginación y agregando los botones
  const element = document.querySelector("." + pagination + " ul");

  element.innerHTML = liTag;
  return liTag;
};

function filterPage(numberPage) {
  const btnsTable = document.querySelectorAll('[id^="page"]');
  const rowsTable = document.querySelectorAll('[name^="page"]'); // Obtengo todas las filas

  if (numberPage > btnsTable.length) {
    numberPage = 1;
  }

  // Mostramos boton previo si es mayor a pagina 1
  const btnPrev = document.querySelector(".prev");
  if (numberPage > 1) {
    btnPrev.style.opacity = 1;
    btnPrev.style['pointer-events'] = 'auto';
  } else if (numberPage <= 1) {
    btnPrev.style.opacity = 0;
    btnPrev.style['pointer-events'] = 'none';
  }

  for (var i = 0; i < rowsTable.length; i++) {
    // Extraigo el numero
    let numberRowPage = rowsTable[i].getAttribute('name');

    // Muestro los que coinciden con el numero pasado a la funcion
    if (numberRowPage.substring(4) == numberPage) {
      rowsTable[i].style.display = "";
    } else {
      rowsTable[i].style.display = "none";
    }
  }

  // Elimino a todos los botones el activo
  for (var i = 0; i < btnsTable.length; i++) {
    btnsTable[i].classList.remove('active');
  }

  // Activo el boton de la pagina seleccionada
  document.getElementById("page" + numberPage).classList.add('active');
};

function next() {
  // Buscamos el boton activo
  const btnActive = document.querySelector(".active span");

  // Llamamos a la funcion de filtro
  filterPage(Number(btnActive.textContent) + 1);
}

function prev() {
  // Buscamos el boton activo
  const btnActive = document.querySelector(".active span");

  // Llamamos a la funcion de filtro
  filterPage(Number(btnActive.textContent) - 1);
}

/**********************************************/
/******** Búsqueda en tabla médicos **********/
/********************************************/
document.getElementById("table-input-search").addEventListener("keyup", searchDoctor);

function searchDoctor() {
  const table = document.getElementById('table_doctors');
  const searchText = document.getElementById('table-input-search').value.toLowerCase();
  let total = 0;

  // Recorremos las filas
  for (let i = 1; i < table.rows.length; i++) {
    let found = false;
    const cellsOfRow = table.rows[i].getElementsByTagName('td');

    // Recorremos las celdas
    for (let j = 0; j < cellsOfRow.length && !found; j++) {
      const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
      // Se busca el texto en la celda
      if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
        found = true;
        total++;
      }
    }

    // Mostrando las coincidencias
    if (found) {
      table.rows[i].style.display = '';
    } else {
      // Ocultando lo que no coincide
      table.rows[i].style.display = 'none';
    }
  }

  if (searchText == '') {
    filterPage(1);
  }
}