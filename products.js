let products = [
    {
        id: 1,
        name: 'Fast Fingers',
        image: 't-shirt01.png',
        price: 30
    },
    {
        id: 2,
        name: 'NIKE SB DUNK HIGH',
        image: 'nike.png',
        price: 200
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: 't-shirt03.png',
        price: 30
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: 't-shirt04.png',
        price: 30
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        image: 't-shirt05.png',
        price: 32
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        image: 't-shirt06.png',
        price: 33
    },
    {
        id: 7,
        name: 'PRODUCT NAME 6',
        image: 't-shirt07.png',
        price: 33
    },
    {
        id: 8,
        name: 'PRODUCT NAME 6',
        image: 't-shirt08.png',
        price: 33
    },
    {
        id: 9,
        name: 'PRODUCT NAME 6',
        image: 't-shirt09.png',
        price: 33
    },
    {
        id: 10,
        name: 'PRODUCT NAME 6',
        image: 't-shirt10.png',
        price: 33
    },
    {
        id: 11,
        name: 'PRODUCT NAME 6',
        image: 't-shirt11.png',
        price: 33
    },
    {
        id: 12,
        name: 'PRODUCT NAME 6',
        image: 't-shirt12.png',
        price: 33
    }
];

let list = document.querySelector('.product-list');
let listCards = [];
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('product-item');
        newDiv.innerHTML = `<a href="/product${value.id}.html">
          <img src="/assets/products/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">$${value.price.toLocaleString()}</div>
             </a>
        `;
        list.appendChild(newDiv);
    })
}
initApp();