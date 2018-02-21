'use strict';
const items = [
    {
        url: 'images/new-zealand-12.jpg',
        type: 'circle',
        name: 'Lake Wakatipu'
    },
    {
        url: 'images/new-zealand-22.jpg',
        type: 'rectangle',
        name: 'Lake Wakatipu'
    },
    {
        url: 'images/new-zealand-32.jpg',
        type: 'square',
        name: 'Lake Wakatipu'
    },
    {
        url: 'images/sun-rise.jpg',
        type: 'triangle',
        name: 'Lake Wakatipu'
    }
];

const overlay = document.querySelector('.overlay');
const close = document.querySelector('.close');

function addImage(obj) {
    if (obj.type == 'triangle') {
        const html = `
            <div class="images images-triangle">
                 <div class="image image-${obj.type}" data-src="${obj.url}" data-alt="${obj.name}"></div>
                 <div class="triangle1"></div>
                 <div class="triangle2"></div>
            </div>
        `;
        document.querySelector('.main-wrap').insertAdjacentHTML('beforeend', html);
    } else {
        const html = `
         <div class="images">
            <div class="image image-${obj.type}" data-src="${obj.url}" data-alt="${obj.name}">
                
            </div>
         </div>
    `;
        document.querySelector('.main-wrap').insertAdjacentHTML('beforeend', html);
    }
}

items.forEach(item => {
    const image = addImage(item);
});

window.onpopstate = function (event) {
    closeOverlay();
};

function openOverlay(e) {
    overlay.style.display = 'flex';
    const image = overlay.querySelector('img');
    image.src = e.target.dataset.src;

    const tittle = document.createElement('h1');
    tittle.innerText = e.target.dataset.alt;
    overlay.append(tittle);
    tittle.classList.add('overlay-tittle');

    history.pushState(items, 'title','?overlay=' + image.src.split('/')[4]);
    let oldHref = document.location.href;
}

function closeOverlay () {
    overlay.style.display = 'none';
    history.back();
}

document.querySelector('.main-wrap').addEventListener('click', openOverlay);
close.addEventListener('click', closeOverlay );