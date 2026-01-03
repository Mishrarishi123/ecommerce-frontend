// 
// Get Product ID from URL
// 
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!productId) {
  document.body.innerHTML = "<h2>Product not found</h2>";
  throw new Error("No product ID");
}

// 
// Global Variables
// 
let currentProduct = null;
let basePrice = 0;
let quantity = 1;
const maxQty = 1000;

// 
// DOM Elements
// 
const productImage = document.getElementById("productImage");
const zoomPreview = document.getElementById("zoomPreview")
const productTitle = document.getElementById("productTitle");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const priceDisplay = document.getElementById("totalPrice");
const qtyDisplay = document.getElementById("quantity");
const addToCartBtn = document.getElementById("addToCartBtn");

// 
// Fetch Product
// 
async function fetchProduct() {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const product = await res.json();

    currentProduct = product;
    basePrice = Math.round(product.price * 80);

    productImage.src = product.image;
    productImage.alt = product.title;
    productTitle.textContent = product.title;
    productPrice.textContent = `₹${basePrice}`;
    productDescription.textContent = product.description;

    updatePrice();
  } catch (error) {
    console.error(error);
    document.body.innerHTML = "<h2>Failed to load product</h2>";
  }
}

// 
// Image Zoom
// 
productImage.addEventListener("mouseenter", () => {
  productImage.classList.add("zoomed");
});

productImage.addEventListener("mouseleave", () => {
  productImage.classList.remove("zoomed");
});

productImage.addEventListener("click", () => {
  productImage.classList.toggle("zoomed");
  zoomPreview.style.display = "block";
  zoomPreview.style.backgroundImage = `url(${productImage.src})`;
});


// 
// Size / Color Selection
// 
function handleOptionSelection(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.addEventListener("click", (e) => {
    if (!e.target.classList.contains("option")) return;

    [...container.children].forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
  });
}

handleOptionSelection("sizeOptions");
handleOptionSelection("colorOptions");

// 
// Quantity Controls
// 
document.getElementById("increaseQty").onclick = () => {
  if (quantity < maxQty) {
    quantity++;
    updatePrice();
  }
};

document.getElementById("decreaseQty").onclick = () => {
  if (quantity > 1) {
    quantity--;
    updatePrice();
  }
};

function updateQuantityUI() {
  qtyDisplay.textContent = quantity;
}

// 
// Price Calculation
// 
function updatePrice() {
  priceDisplay.textContent = basePrice * quantity;
  updateQuantityUI();
}

// 
// Cart Count Update
// 
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalItems = 0;
  cart.forEach((item) => {
    totalItems += item.quantity;
  });

  const countEl = document.getElementById("count");
  if (countEl) {
    countEl.textContent = totalItems;
  }
}

// 
// Add To Cart (FINAL VERSION)
// 
addToCartBtn.addEventListener("click", () => {
  if (!currentProduct) return;

  const selectedSize = document.querySelector(
    "#sizeOptions .active"
  )?.textContent;
  const selectedColor = document.querySelector(
    "#colorOptions .active"
  )?.textContent;

  if (!selectedSize || !selectedColor) {
    alert("Please select size and color");
    return;
  }

  const cartItem = {
    id: currentProduct.id,
    title: currentProduct.title,
    image: currentProduct.image,
    size: selectedSize,
    color: selectedColor,
    quantity,
    price: basePrice,
    totalPrice: basePrice * quantity,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  //  MERGE LOGIC (IMPORTANT)
  const existingItem = cart.find(
    (item) =>
      item.id === cartItem.id &&
      item.size === cartItem.size &&
      item.color === cartItem.color
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.totalPrice += cartItem.totalPrice;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount(); // updates cart badge instantly

  alert("Product added to cart successfully");
});




// 
// Initial Calls
// 
fetchProduct();
updateCartCount();




