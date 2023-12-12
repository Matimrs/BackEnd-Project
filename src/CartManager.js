import fs from 'fs';

export class CartManager {

    constructor(filePath){
        this.path = filePath;
        this.id = this.calculateNextId();
        this.carts = [];
    }

    calculateNextId() {
        if (this.carts.length === 0) {
            return 1;
        }
        const maxId = Math.max(...this.carts.map(c => c.id));
        return maxId + 1;
    }

    getCarts() {
        try {
            const data = fs.promises.readFileSync(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    addCart(){
        try {
            this.carts.push({ id: this.calculateNextId(), products: []});
            this.saveCarts();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
        
    }
    saveCarts() {
        const data = JSON.stringify(this.carts, null, 2);

        fs.writeFileSync(this.path, data, 'utf-8');
    }
    getCartById(id){
        const cart = this.carts.find(c => c.id === +id);

        if (!cart) {
            console.log('No se encontró el cart');
            return false;
        }

        return cart;
    }

    addProductToCart(cid, pid){
        const cart = this.carts.map(c =>{
            if(c.id === cid){
                const product = c.find(p => p.id === +pid);
                if(!product){
                    c.products = [...c.products, {product: pid, quantity: 1}];
                }
                else{
                    product.quantity++;
                }
            }
            return cart;
        } );
        this.saveCarts();
    }
    
}