const { v4: uuidv4, } = require('uuid')
const Product = require('./product');

module.exports = class Carrito {
  constructor(){
    this.items = [];
  }

  addProduct(product) {
    // todo add control of a product
    if (typeof product !== 'object') {
      throw new Error('product must be an object');
    }
    if (!(product instanceof Product)){
      throw new Error('product is not of type Product');
    }
    // product.uuid = uuidv1({
    //
    //   nsecs: Math.floor(Math.random() * 10000)
    // });
    product.uuid = uuidv4();
    //product.uuid = Math.random();
    this.items.push(product);

    return product;
  }

  removeProduct(product) {
    // todo should not remove by id, it shoul remove by uuid
    if (!(product instanceof Product)){
      throw new Error('product is not of type Product');
    }
    this.items = this.items.filter(e => e.uuid !== product.uuid);
  }

  getTotalItems(){
    return this.items.length;
  }

  getTotalCheckout(){
    // todo tests not passing
    return this.items.reduce((acc, curr) => acc = acc + curr.price, 0);
  }
}
