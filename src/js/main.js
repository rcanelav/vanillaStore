const mainImage = document.querySelector('#main-image');

const getData = async () => {
    const resp = await fetch("https://asos2.p.rapidapi.com/products/v2/list?limit=48&categoryId=4209&offset=0&store=US&lang=en-US&sizeSchema=US&currency=USD&sort=freshness&country=US", {
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
const { products } = data;

// Aleatory product for mainpage
const aleatoryProduct = products[Math.floor(Math.random() * products.length)];

const fragment = document.createDocumentFragment();
const img = document.createElement('img');
img.setAttribute('src', `https://${aleatoryProduct.imageUrl}`);
img.setAttribute('alt', aleatoryProduct.name);

const imgTitle = document.createElement('p');
imgTitle.textContent = aleatoryProduct.name;

const price = document.createElement('span');
price.textContent = `${aleatoryProduct.price.current.value}€`;
fragment.appendChild(price);
fragment.append(img);
fragment.append(imgTitle);
mainImage.appendChild(fragment);
