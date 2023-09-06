//Slider
const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
    },
})
//Product Image Slider
let productThumb = new Swiper('.small-image', {
    loop: true,
    spaceBetween: 2,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
        481: {
            spaceBetween: 32,
        }
    }
})

let productBig = new Swiper('.big-image', {
    loop: true,
    autoHeight: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    thumbs: {
        swiper: productThumb,
    }
})

let stocks = document.querySelectorAll('.products .stock');
for (let x = 0; x < stocks.length; x++) {
    let stock = stocks[x].dataset.stock,
        available = stock[x].querySelector('.qty-available').innerHTML,
        sold = stocks[x].querySelector('.qty-sold'),
        percent = sold * 100 / stock;

    stocks[x].querySelector('.available').style.width = percent + '%';
}

// //show cart on click
// const divtoShow = '.mini-cart';
// const divPopup = document.querySelector(divtoShow);
// const divTrigger = document.querySelector('.cart-trigger');

// divTrigger.addEventListener('click', () => {
//     setTimeout(() => {
//         if (!divPopup.classList.contains('show')) {
//             divPopup.classList.add('show')
//         }
//     }, 250)
// })

// //close by click outside
// document.addEventListener('click', (e) => {
//     const isClosest = e.target.closest(divtoShow);
//     if (!isClosest && divPopup.classList.contains('show')) {
//         divPopup.classList.remove('show')
//     }
// })


// Shopping Cart
let shoppingCart = (function () {
    let cart = [];

    //Constructor
    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }
    //Save Cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    //Load Cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }


    //Public Methods and Properties
    const obj = {}
    //Add To Cart
    obj.addItemToCart = function (name, price, count) {
        for (let item in cart) {
            if (cart[item].name === name) {
                cart[item].count++;
                saveCart();
                return
            }
        }
        let item = new Item(name, price, count);
        cart.push(item);
        saveCart();
    }
    //Set count from item
    obj.setCountForItem = function (name, count) {
        for (let i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };
    //Remove item from cart
    obj.removeItemFromCart = function (name) {
        for (let item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1)
                }
                break;
            }
        }
        saveCart();
    }

    //Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
        for (let item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }
    //Clear cart 
    obj.clearCart = function () {
        cart = [];
        saveCart();
    }

    //Count cart
    obj.totalCount = function () {
        let totalCount = 0;
        for (let item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    //Total Cart
    obj.totalCart = function () {
        let totalCart = 0;
        for (let item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }
    //List Cart
    obj.listCart = function () {
        const cartCopy = [];
        for (let i in cart) {
            const item = cart[i];
            itemCopy = {};
            for (let p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy);
        }
        return cartCopy;
    }
    return obj;
})();

//Add Item
$('.add-to-cart').click(function (event) {
    //alert('working');
    event.preventDefault();
    let name = $(this).data('name');
    let price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
});

//Clear Item
$('.clear-cart').click(function () {
    shoppingCart.clearCart();
    displayCart();
})

function displayCart() {
    let cartArray = shoppingCart.listCart();
    let output = "";
    for (let i in cartArray) {
        output += "<tr>"
            + "<td>" + cartArray[i].name + "</td>"
            + "<td>(" + cartArray[i].price + ")</td>"
            + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
            + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
            + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
            + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
            + " = "
            + "<td>" + cartArray[i].total + "</td>"
            + "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

//Delete Item Button
$('.show-cart').on('click', '.delete-item', function (event) {
    let name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart()
})

//-1
// -1
$('.show-cart').on("click", ".minus-item", function (event) {
    let name = $(this).data('name')
    console.log(name)
    shoppingCart.removeItemFromCart(name);
    displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function (event) {
    let name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
})

//Item Count Input
$('.show-cart').on('change', '.item-count',
    function (event) {
        let name = $(this).data('name');
        let count = Number($(this).val());
        shoppingCart.setCountForItem(name, count);
        displayCart();
    });
displayCart();


// Cart Modal
let modal = document.querySelector(".modal");
let trigger = document.querySelector(".trigger");
let closeButton = document.querySelector(".close-btn");


function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
