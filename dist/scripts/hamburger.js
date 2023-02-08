var mobilenav = document.getElementById("mobilenav");
var checkboxHam = document.getElementById("hamburger");

function burgerMenu() {
    if (checkboxHam.checked == true) {
        mobilenav.style.display = "block";
    } else {
        mobilenav.style.display = "none";
    }
}