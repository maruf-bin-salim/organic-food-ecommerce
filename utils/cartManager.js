let setCart = function (key, value) {
    localStorage.setItem(key, value);

};

let getCart = function (key) {
    return localStorage.getItem(key);
}


function checkIfProductExists(product, products) {
    return products.findIndex((p) => p.id === product.id) !== -1;
}

function getIndexOfProduct(product, products) {
    return products.findIndex((p) => p.id === product.id);
}


function increaseQuantityOfProductInCart(product) {
    let cart = getCart("cart");
    if (cart) {
        cart = JSON.parse(cart);
        if (checkIfProductExists(product, cart.products)) {
            let index = getIndexOfProduct(product, cart.products);
            cart.products[index].quantity += 1;
            cart.total += product.price;
            setCart("cart", JSON.stringify(cart));
        }
        else {
            cart.products.push({ ...product, quantity: 1 });
            cart.total += product.price;
            setCart("cart", JSON.stringify(cart));
        }
    }
    else {
        setCart("cart", JSON.stringify({ products: [{ ...product, quantity: 1 }], total: product.price }));
    }
}

function decreaseQuantityOfProductInCart(product) {
    let cart = getCart("cart");
    if (cart) {
        cart = JSON.parse(cart);
        if (checkIfProductExists(product, cart.products)) {
            let index = getIndexOfProduct(product, cart.products);
            if (cart.products[index].quantity === 1) {
                cart.products.splice(index, 1);
            } else {
                cart.products[index].quantity -= 1;
            }
            cart.total -= product.price;
            setCart("cart", JSON.stringify(cart));
        }
    }
}

function removeProductFromCart(product) {
    let cart = getCart("cart");
    if (cart) {
        cart = JSON.parse(cart);
        if (checkIfProductExists(product, cart.products)) {
            let index = getIndexOfProduct(product, cart.products);
            cart.products.splice(index, 1);
            cart.total -= product.price * product.quantity;
            setCart("cart", JSON.stringify(cart));
        }
    }
}

function clearCart() {
    setCart("cart", JSON.stringify({ products: [], total: 0 }));
}

function getQuantityOfProduct(product) {
    let cart = getCart("cart");
    if (cart) {
        cart = JSON.parse(cart);
        if (checkIfProductExists(product, cart.products)) {
            let index = getIndexOfProduct(product, cart.products);
            return cart.products[index].quantity;
        }
    }
    return 0;
}



function getCartTotal() {
    let cart = getCart("cart");
    if (cart) {
        cart = JSON.parse(cart);
        return cart.total;
    }
    return 0;
}

function getProductsFromCart() {
    let cart = getCart("cart");
    if (cart) {
        cart = JSON.parse(cart);
        return cart.products;
    }
    return [];
}

function isProductInCart(product) {
    let cart = getCart("cart");
    if (cart) {
        cart = JSON.parse(cart);
        return checkIfProductExists(product, cart.products);
    }
    return false;
}




function getCartAsObject()
{
    let cart = getCart("cart");
    if (cart) {
        cart = JSON.parse(cart);
        return cart;
    }
    return {products: [], total: 0};
}


export {
    isProductInCart,
    increaseQuantityOfProductInCart, decreaseQuantityOfProductInCart, getQuantityOfProduct,
    removeProductFromCart,
    clearCart, getCartTotal,
    getProductsFromCart,
    getCartAsObject
};    