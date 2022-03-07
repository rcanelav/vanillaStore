
const productId = window.location.search.split('=')[1];
const root = document.querySelector('#product-presentation');

const getData = async () => {
    const resp = await fetch(`https://asos2.p.rapidapi.com/products/v3/detail?id=${productId}&currency=USD&sizeSchema=US&store=US&lang=en-US`, {
        method: "GET",
        headers: {
            "x-rapidapi-host": "asos2.p.rapidapi.com",
            "x-rapidapi-key": "fb9fc2b5dcmshabf1f7bbd0a5302p1be40fjsn809fbfc0051a"
        },
        mode: "cors"
    });

    return resp.json();
};
// const data = await getData();
const { images } = data.media;

console.log(productId)
console.log(images)
console.log(data)
const parser = new DOMParser();
const createImage = (image) => {
    const img = document.createElement('img');
    img.setAttribute('src', `https://${image.url}`);
    img.setAttribute('alt', image.title);
    return img;
}

const createParraph = (text) => {
    const p = document.createElement('p');
    p.innerHTML = parser.parseFromString(text, 'text/html').body.textContent;
    return p;
}

// First row
const fragment = document.createDocumentFragment();
const firstRow = document.createElement('div');
const buyButton = document.createElement('div');
buyButton.textContent = 'ADD TO CART';
buyButton.classList.add('buy-button');

firstRow.classList.add('row');
firstRow.appendChild( createImage(images[0]) );
firstRow.appendChild( createParraph(`${data.name} Price: ${data.price.current.value}€`) );
firstRow.appendChild( buyButton );
fragment.appendChild(firstRow);

// Second row
const secondRow = document.createElement('div');
secondRow.classList.add('row');
secondRow.appendChild( createParraph(`${data.description}`) );
secondRow.appendChild( createImage(images[1]) );

fragment.appendChild(secondRow);

// Third row
const thirdRow = document.createElement('div');
thirdRow.classList.add('row');
thirdRow.appendChild( createImage(images[2]) );
thirdRow.appendChild( createParraph(`Composition: ${data.info.aboutMe}`) );

fragment.appendChild(thirdRow);

// Fourth row
const fourthRow = document.createElement('div');
fourthRow.classList.add('row');
fourthRow.appendChild( createParraph(`Care information: ${data.info.careInfo}`) );
fourthRow.appendChild( createImage(images[3]) );

fragment.appendChild(fourthRow);


root.appendChild(fragment);
