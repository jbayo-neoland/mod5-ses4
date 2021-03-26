module.exports = class Carrito {
  constructor(){
    this.items = [];
  }

  addProduct(product) {
    // todo add control of a product
    this.items.push(product);
  }

  removeProduct(product) {
    // todo should not remove by id, it shoul remove by uuid
    this.items = this.items.filter(e => e.id !== product.id);
  }

  getTotalItems(){
    return this.items.length;
  }

  getTotalCheckout(){
    // todo tests not passing
    return this.items.reduce((prev, curr) => prev.price += curr.price);
  }
}
