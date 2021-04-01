const { v4: uuidv4, } = require('uuid')
const Product = require('./product');
const Coupon = require('./coupon');
const Item = require('./item');

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
    return this.addItem(product);
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
    let total = this.items
    .filter(e => e instanceof Product)
    .reduce((acc, curr) => acc = acc + curr.price, 0);

    // apply discounts
    this.items.filter(e => e instanceof Coupon)
    .forEach(item => {
      total -= item.relative ? total*item.price/100 : item.price;
    })
    return total;
  }

  addCoupon(coupon){
    if (!(coupon instanceof Coupon)){
      throw new Error('coupon is not of type Coupon');
    }

    const alreadyHaveCoupons = this.items.find(e => e instanceof Coupon);
    if (alreadyHaveCoupons && coupon.unique) {
      throw new Error('coupon is unique and is already in the list of items');
    }
    // this is new =)
    const alreadyHaveUniqueCoupon = this.items.find(e => e instanceof Coupon && e.unique);
    if (alreadyHaveUniqueCoupon) {
      throw new Error('there is already a unique coupon, no more coupons can be added');
    }
    return this.addItem(coupon);
  }

  removeCoupon(coupon){
    if (!(coupon instanceof Coupon)){
      throw new Error('coupon is not of type Coupon');
    }
    this.items = this.items.filter(e => e.uuid !== coupon.uuid);
  }

  addItem(item) {
    if (!(item instanceof Item)){
      throw new Error('item is not of type Item');
    }
    item.uuid = uuidv4();
    this.items.push(item);
    return item;
  }
}
