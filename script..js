/* =========================================
   VARIABLES
========================================= */

let cart = [];

const cartBtn = document.getElementById("cartBtn");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");


/* =========================================
   CART OPEN / CLOSE
========================================= */

cartBtn.addEventListener("click", () => {
    cartOverlay.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cartOverlay.classList.remove("active");
});

cartOverlay.addEventListener("click", (event) => {

    if (event.target === cartOverlay) {
        cartOverlay.classList.remove("active");
    }

});


/* =========================================
   ADD TO CART
========================================= */

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const product = button.dataset.product;
        const price = Number(button.dataset.price);

        addToCart(product, price);

    });

});


function addToCart(product, price) {

    const existingProduct = cart.find(
        item => item.product === product
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            product: product,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    cartOverlay.classList.add("active");

}


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    } else {

        cart.forEach((item, index) => {

            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `

                <div class="cart-item-info">

                    <h4>${item.product}</h4>

                    <p>
                        ₹${item.price.toLocaleString("en-IN")}
                        × ${item.quantity}
                    </p>

                </div>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            `;

            cartItems.appendChild(cartItem);

        });

    }


    /* Cart count */

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalQuantity;


    /* Cart total */

    const totalPrice = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    cartTotal.textContent =
        "₹" + totalPrice.toLocaleString("en-IN");

}


/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* =========================================
   SEARCH
========================================= */

searchBtn.addEventListener("click", () => {

    searchBox.classList.add("active");

    searchInput.focus();

});


closeSearch.addEventListener("click", () => {

    searchBox.classList.remove("active");

    searchInput.value = "";

    showAllProducts();

});


searchInput.addEventListener("input", () => {

    const searchTerm =
        searchInput.value.toLowerCase().trim();

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {

        const productName =
            product.dataset.name.toLowerCase();

        const category =
            product.dataset.category.toLowerCase();

        if (
            productName.includes(searchTerm) ||
            category.includes(searchTerm)
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

});


function showAllProducts() {

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {

        product.style.display = "block";

    });

}


/* =========================================
   WISHLIST
========================================= */

const hearts =
    document.querySelectorAll(".heart");

hearts.forEach(heart => {

    heart.addEventListener("click", () => {

        const icon =
            heart.querySelector("i");

        if (
            icon.classList.contains("fa-regular")
        ) {

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

        } else {

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

        }

    });

});


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn =
    document.getElementById("menuBtn");

const navbar =
    document.querySelector(".navbar");


menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("mobile-menu");

});


/* =========================================
   SMOOTH PRODUCT ANIMATION
========================================= */

const cards =
    document.querySelectorAll(".product-card");

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.1
        }
    );


cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(card);

});


/* =========================================
   CHECKOUT
========================================= */

const checkout =
    document.querySelector(".checkout");

checkout.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    alert(
        "Checkout system coming soon!"
    );

});


/* =========================================
   INITIAL CART
========================================= */

updateCart();
