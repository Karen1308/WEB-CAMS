const form_violence = document.getElementById('violence');
var message1 = document.getElementById('message1');
var message2 = document.getElementById('message2');
var message3 = document.getElementById('message3');

function envioDatos() {
    var preg1 = document.getElementById('1_si').checked;
    var preg2 = document.getElementById('2_si').checked;
    var preg3 = document.getElementById('3_si').checked;
    var preg4 = document.getElementById('4_si').checked;
    var preg5 = document.getElementById('5_si').checked;

    var parametros = {
        "preg1": preg1,
        "preg2": preg2,
        "preg3": preg3,
        "preg4": preg4,
        "preg5": preg5,
    };

    $.ajax({
        data: parametros,
        url: 'violencia.php',
        type: 'POST',

        success: function () {
            if (((preg4 === true) && (preg1 === false) && (preg2 === false) && (preg3 === false) && (preg5 === false)) || 
                (preg1 === true) && (preg2 === true) && (preg3 === true) && (preg5 === true) && (preg4 === true)) {
                message2.classList.remove('display');
                message3.classList.remove('display');
                message1.classList.add('display');

            } else if ((preg1 == true) && (preg2 == true) && (preg3 == true) && (preg5 == true) && (preg4 == false)) {
                message1.classList.remove('display');
                message3.classList.remove('display');
                message2.classList.add('display');
                
            } else {
                message1.classList.remove('display');
                message2.classList.remove('display');
                message3.classList.add('display');
            };
        },
        error: function (error) {
            console.log(error);
        }
    });
}

form_violence.addEventListener('reset', (e) => {
    message1.classList.remove('display');
    message2.classList.remove('display');
    message3.classList.remove('display');
});