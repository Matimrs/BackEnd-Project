export class UserDTO {
  constructor(firstName, lastName, age, email, cart, role) {
    this.name = `${firstName} ${lastName}`;
    this.email = email;
    this.age = age;
    this.cart = cart;
    this.role = role;
  }
  getCurrent(){
    return ({name: this.name, email: this.email, role: this.role, cart: this.cart});
  }
}
