const Item = require('item');
module.exports = class Coupons extends Item{
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
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.relative = relative; // boolean
    this.unique = unique; // boolean
    this.expire_date = expire_date // Date or null;
    this.description = description;
  }
}
