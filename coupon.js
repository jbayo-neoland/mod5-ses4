const Item = require('./item');
module.exports = class Coupon extends Item{
  constructor(
    id,
    name,
    price,
    category,
    relative,
    unique,
    expire_date,
    description = null
  ){
    super(id, name, price, category);
    this.relative = relative; // boolean
    this.unique = unique; // boolean
    this.expire_date = expire_date // Date or null;
    this.description = description;
  }

  isValid() {
    return new Promise((resolve, reject) => {
      if (this.expire_date) {
        const now = new Date();
        if (this.expire_date.getTime() < now.getTime()) {
          reject('coupon expired');
        }
      }
      resolve(true);
    })
  }
}
