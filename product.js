const Item = require('item');

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

      if (!id) {
        throw new Error('id must be set');
      }
      if (!name) {
        throw new Error('name must be set');
      }
      if (!price) {
        throw new Error('price must be set');
      }
      if (!category) {
        throw new Error('category must be set');
      }

      this.id = id;
      this.name = name;
      this.price = price;
      this.category = category;
      this.sales = sales;
      this.stock = stock;
      this.origin = origin;
      this.description = description;
      this.ean = ean;
      this.size = size;
      this.composition = composition;
  }
}
