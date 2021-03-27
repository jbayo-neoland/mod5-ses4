const Item = require('./item');

module.exports = class Product extends Item{
  constructor(
    id,
    name,
    price,
    category,
    sales = null,
    stock = null,
    origin = null,
    description = null,
    ean = null,
    size = null,
    composition = null) {
      super(id, name, price, category);
      
      this.sales = sales;
      this.stock = stock;
      this.origin = origin;
      this.description = description;
      this.ean = ean;
      this.size = size;
      this.composition = composition;
  }
}
