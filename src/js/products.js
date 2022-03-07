const productsGrid = document.querySelector('#container-grid');

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
console.log(products)
const fragment = document.createDocumentFragment();

products.forEach(product => {
    const div = document.createElement('div');
    const anchor = document.createElement('a');
    anchor.setAttribute('href', `./details.html?id=${product.id}`);
    div.classList.add('product');
    const img = document.createElement('img');
    img.setAttribute('src', `https://${product.imageUrl}`);
    img.setAttribute('alt', product.name);
    const imgTitle = document.createElement('p');
    imgTitle.textContent = product.name;
    const price = document.createElement('span');
    price.textContent = `Price: ${product.price.current.value}€`;
    anchor.appendChild(img);
    anchor.append(imgTitle);
    anchor.append(price);
    div.appendChild(anchor);
    fragment.appendChild(anchor);
});
productsGrid.appendChild(fragment);
