class Error {
    constructor(status, message){
        this.status = status,
        this.message = message
    }
}

export const errorsDictionary = {
    cartsNotFound: new Error(404, "Cart(s) not found"),
    cartNotCreated: new Error(422, "Cart not created"),
    cartEmpty: new Error(400, "Cart empty"),
    productsNotFound: new Error(404, "Product(s) not found"),
    productAlreadyExists: new Error(409, "Product already exists"),
    userNotFound: new Error(404, "User not found"),
    puserAlreadyExists: new Error(409, "User already exists"),
    allFieldsRequired: new Error(400, "All fields are required"),
    invalidFormat: new Error(400, "Invalid format"),
    invalidCredentials: new Error(401, "Invalid Credentials"),
    unauthorized: new Error(401, "Unauthorized: Insufficient permissions"),
    internalServerError: new Error(500, "Internal server error"),

}