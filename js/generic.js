function display_by_name(id_element) {
    var elements = document.getElementsByName(id_element);

    for (var i = 0; i < elements.length; i++) {
        if (elements[i].style.visibility == 'hidden' || elements[i].style.visibility.length == 0) {
            elements[i].style.setProperty("visibility", "visible", "important");
        } else {
            elements[i].style.visibility = 'hidden';
        };
    }
}

function display_by_id(id_element) {
    var element = document.getElementById(id_element);
    element.classList.toggle("display");

    var elements_class = document.getElementsByClassName('display');
    if (elements_class.length != 0) {
        for (var i = 0; i < elements_class.length; i++) {
            if (elements_class[i].id != id_element) {
                elements_class[i].classList.remove('display');
            }
        }
    }
}

function close(id_element) {
    var element = document.getElementsByName(id_element);
    element.style.visibility = 'hidden';
}