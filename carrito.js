module.exports = class Carrito {
  constructor(){
    this.items = [];
  }

  addProduct(product) {
    this.items.push(product);
  }

  removeProduct(product) {
    this.items = this.items.filter(e => e.id !== product.id);
  }

  getTotalItems(){
    return this.items.length;
  }

  getTotalCheckout(){
    return this.items.reduce((prev, curr) => prev.price += curr.price);
  }
}
