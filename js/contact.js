let open_modal = document.querySelectorAll(".container-btn-form")[0];
let modal = document.querySelectorAll(".modal")[0];
let modal_container = document.querySelectorAll(".modal_container")[0];

open_modal.addEventListener("click", function (e) {
    e.preventDefault();
    modal_container.style.opacity = "1";
    modal_container.style.visibility = "visible";
    modal.classList.toggle("modal-close");
})

window.addEventListener("click", function (e) {
    if (e.target == modal_container) {
        modal.classList.toggle("modal-close");

        setTimeout(function () {
            modal_container.style.opacity = "0";
            modal_container.style.visibility = "hidden";
        }, 600)
    }
})

function closemodalcruz() {
    document.getElementById("modal-close").style.visibility = "hidden";
    document.getElementById("modal-close").style.opacity = "0";
    // window.location.reload(); 
}