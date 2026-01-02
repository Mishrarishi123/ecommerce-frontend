console.log("E-Commerce Website Loaded");

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
const nav =document. querySelector("nav")

  if (!hamburger || !nav) {
    console.error("Hamburger or navigation not found");
    return;
  }

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
});

function goToProducts() {
  const productsSection = document.getElementById("products");

  if (productsSection) {
    productsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

/* 
   PRODUCTS
 */

const productGrid = document.getElementById("productGrid");
const productTemplate = document.getElementById("product-card");

// Fetch products from API
async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Render products
function renderProducts(products) {
  productTemplate.remove(); // remove template from DOM

  products.forEach((product) => {
    const card = productTemplate.cloneNode(true);
    card.removeAttribute("id");
    card.classList.add("product-card");

    const img = card.querySelector("img");
    img.src = product.image;
    img.alt = product.title;
    img.loading = "lazy";

    card.querySelector("h3").textContent = product.title;
    card.querySelector("p").textContent = `₹${Math.round(product.price * 80)}`;

    const button = card.querySelector("button");
    button.textContent = "View Details";

    /* 👉 BUTTON CLICK → PRODUCT DETAIL PAGE */
    button.addEventListener("click", () => {
      window.location.href = `product.html?id=${product.id}`;
    });

    productGrid.appendChild(card);
  });
}

/* 
   INIT
 */

fetchProducts();
