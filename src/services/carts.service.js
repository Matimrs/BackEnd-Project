import { createCart, findCartByID, getCartPersistence, getCartsPersistence, updateOneCart } from "../persistence/carts.persistence.js"

export const getCartsService = () => {
    return getCartsPersistence();
}

export const createCartService = () => {
    return createCart();
}

export const getCartService = (cid) => {
    return getCartPersistence(cid);
}

export const findCartByIDService = (cid) => {
    return findCartByID(cid);
}

export const updateOneCartService = (filter, updates) => {
    return updateOneCart(filter,updates);
} 