const socket = io();

const buttonCreate = document.getElementById('buttonCreate');
const title = document.getElementById('title');
const description = document.getElementById('description');
const code = document.getElementById('code');
const price = document.getElementById('price');
const stock = document.getElementById('stock');
const category = document.getElementById('category');

buttonCreate.addEventListener('click',()=>{
    socket.emit('createProduct',{
        title: title.value,
        description: description.value,
        code: code.value,
        price: price.value,
        stock: stock.value,
        category: category.value
    });
});

const id = document.getElementById('id');
const buttonDelete = document.getElementById('buttonDelete');

buttonDelete.addEventListener('click',()=>{
    socket.emit('deleteProduct',id.value);
})

const divProducts = document.getElementById('divProducts');

socket.on('products',({products})=>{
    divProducts.innerHTML = "<div id='divProducts'></div>";
    products.forEach(e => {
        const product = document.createElement("div");
        product.innerHTML = "<div><h4>" + e.title + ":</h4><p>Price: $" + e.price+ "</p><p>Stock: " + e.stock+ "</p><p>ID: " + e.id+ "</p></div>";
        divProducts.appendChild(product);
    });
});