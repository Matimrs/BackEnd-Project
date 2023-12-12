import fs from 'fs';

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
            console.error(error);
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
            return -2;
        }
/*
        if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category) {
            console.log('Todos los campos son obligatorios');
            return -1;
        }
*/
        const newProduct = { ...product, available: true, id: this.calculateNextId() };

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

