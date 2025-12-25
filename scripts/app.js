console.log("E-Commerce Website Loaded");


const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("navigation");

hamburger.addEventListener("click", () => {
    if (nav.style.display === "block") {
        nav.style.display = "none";
    } else {
        nav.style.display = "block";
    }
})

function goToProducts() {
    window.location.href = "#"
}