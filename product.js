module.exports = class Product {
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
