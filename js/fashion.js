// Variables
let iconBar = document.querySelector('.icon-bar');
let iconCloseNav = document.querySelector('.icon-close');
let iconSearch = document.querySelector('.icon-search');
let iconCart = document.querySelector('.cart-shopping');
let navbar = document.getElementsByTagName('nav')[0];
let searchBox = document.querySelector('.search-box');
let closesearchBox = document.querySelector('.close-search');
let iconCloseCart = document.getElementsByClassName('close-cart')[0];
let cart = document.getElementsByClassName('cart')[0];

let goUp = document.getElementsByClassName('go-up')[0];


// Open Navbar In Mobile And Tablet
iconBar.onclick = () => {
    navbar.classList.add('active');
    iconBar.classList.add('hidd');
    iconCloseNav.classList.add('disp');
}

// Open Navbar In Mobile And Tablet
iconCloseNav.onclick = () => {
    navbar.classList.remove('active');
    iconBar.classList.remove('hidd');
    iconCloseNav.classList.remove('disp');
}

// Open Search Form
iconSearch.onclick = () => {
    searchBox.classList.add('visible');
}

// Close Search Form
closesearchBox.onclick = () => {
    searchBox.classList.remove('visible');
}

// Open Cart Shopping
iconCart.onclick = () => {
    cart.classList.add('active');
}

// Close Cart Shopping
iconCloseCart.onclick = () => {
    cart.classList.remove('active');
}

// Check Sure if Dom Content is Loaded
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Main Function
function ready() {
    // Remove Items From Cart
    let removeCartButton = document.getElementsByClassName('remove-cart');
    for (let i = 0; i < removeCartButton.length; i++) {
        let button = removeCartButton[i];
        button.addEventListener('click', removeItemCart);
    }

    // Change Quantity Input 
    let quantityInput = document.getElementsByClassName('cart-quantity');
    for (let i = 0; i < quantityInput.length; i++){
        let input = quantityInput[i];
        input.addEventListener('change', quantityChanged);
    }

    // Add Product To Cart
    let addToCart = document.getElementsByClassName('add-cart');
    for (let i = 0; i < addToCart.length; i++) {
        let button = addToCart[i];
        button.addEventListener('click', addCartClicked);
    }
    // Button Buy Working
    document.getElementsByClassName('btn-buy')[0].addEventListener('click' ,buyButtonClicked )

    
}

// Remove Items From Cart
function removeItemCart(event) {
    let button = event.target;
    button.parentElement.remove();
    updateTotoal();
}

// Change Quantity Input 
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 1) {
        input.value = 1;
    }
    updateTotoal();
}

// Add Product To Cart 
function addCartClicked(event) {
    let button = event.target;
    let shopProducts = button.parentElement;
    let productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    let price = shopProducts.getElementsByClassName('product-price')[0].innerText;
    addProductToCart(productImg, title, price);
    updateTotoal();
}

// Add Product To Cart 
function addProductToCart(productImg, title, price) {
    let cartShopProduct = document.createElement('div');
    cartShopProduct.classList.add('cart-box');
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('product-title');
    for (let i = 0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title) {
            alert('You have already add this item to cart!');
            return;
        }
        updateTotoal();
    }
    let cartBoxContent = `
              <img class="product-img" src="${productImg}" alt="">
              <div class="product-detial">
                <div class="product-title">${title}</div>
                <div class="product-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
              </div>
              <i class="fa-regular fa-trash-can remove-cart"></i>
            `;
    
    cartShopProduct.innerHTML = cartBoxContent;
    cartItems.append(cartShopProduct);
    cartShopProduct.getElementsByClassName('remove-cart')[0].addEventListener('click', removeItemCart);
    cartShopProduct.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

// Button Buy Working
function buyButtonClicked() {
    alert('Your Order is Done! ');
    let cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotoal();
}

// Update Total
function updateTotoal() {
    let total = 0;
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceProduct = cartBox.getElementsByClassName('product-price')[0];
        let quantityProduct = cartBox.getElementsByClassName('cart-quantity')[0];

        let price = parseFloat(priceProduct.innerText.replace('$', ''));
        let quantity = quantityProduct.value;

        total = total + price * quantity;
    }
    // If total conatin sents
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerHTML = '$' + total;
}

// Button it is use to go up
window.onscroll = () => {
    if (window.scrollY >= 800) {
        goUp.style.display = 'block';
    } else {
        goUp.style.display = 'none';
    }
}

goUp.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior :"smooth",
    })
})