const buttons = document.getElementsByClassName('addToCart');

for (const btn of buttons) {
    btn.addEventListener('click',(event) => {
        addProductToCart(btn.id);
    })
}

const addProductToCart = async (pid) => {
    try {

        const result = await fetch(`http://localhost:8080/api/carts/65a9aaab05089b37f40c87b3/product/${pid}`,{
            body: JSON.stringify({
            }),
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!result) alert('No se pudo agregar')
        else alert('Se agrego correctamente')
        
    } catch (error) {
        console.error(error);
    }
}