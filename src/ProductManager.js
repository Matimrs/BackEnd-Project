const fs = require('fs');

export class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = this.loadProducts();
        this.id = this.calculateNextId();
    }

    calculateNextId() {
        if (this.products.length === 0) {
            return 1;
        }
        const maxId = Math.max(...this.products.map(p => p.id));
        return maxId + 1;
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    saveProducts() {
        const data = JSON.stringify(this.products, null, 2);

        fs.writeFileSync(this.path, data, 'utf-8');
    }

    addProduct(product) {

        if (this.products.some(p => p.code === product.code)) {
            console.log('Ya existe un producto con ese codigo');
            return;
        }

        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log('Todos los campos son obligatorios');
            return;
        }

        const newProduct = { ...product, id: this.id++ };

        this.products.push(newProduct);

        this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);

        if (!product) {
            console.log('No se encontró el producto');
            return;
        }

        return product;
    }

    updateProduct(id, updatedProduct) {
        
        let product = this.getProductById(id);

        if(product){
            for(const key in updatedProduct) {
                    product[key] = updatedProduct[key];            
            };

            product.id = id;
            this.saveProducts(product);
        }
        
    }

    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);

        if (index === -1) {
            console.log('No se encontró el producto');
            return;
        }

        this.products.splice(index, 1);
        this.saveProducts();
    }
}


// Test:

const productManager = new ProductManager('./products.json');

console.log('Productos después de crear la instancia:', productManager.getProducts()); // []

productManager.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
});

console.log('Productos después de agregar un producto:', productManager.getProducts());

const productId = productManager.getProducts()[0].id; // Tomar el id del primer producto agregado
console.log('Producto con id', productId, ':', productManager.getProductById(productId));

productManager.updateProduct(productId, { price: 250 }); // Actualizar el precio del producto
console.log('Productos después de actualizar un producto:', productManager.getProducts());

productManager.deleteProduct(productId); // Eliminar el producto
console.log('Productos después de eliminar un producto:', productManager.getProducts());
