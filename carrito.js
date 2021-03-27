const { v4: uuidv4 } = require('uuid')

module.exports = class Carrito {
  constructor(){
    this.items = [];
  }

  addProduct(product) {
    // todo add control of a product
    if (typeof product !== 'object') {
      throw new Error('product must be an object');
    }
    product.uuid = uuidv4();
    this.items.push(product);

    return product;
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
    return this.items.reduce((acc, curr) => acc = acc + curr.price, 0);
  }
}
