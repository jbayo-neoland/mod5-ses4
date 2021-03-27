module.exports = class Item {
  constructor(id, name, price, category) {
    if (!id) {
      throw new Error('id must be set');
    }
    if (!name) {
      throw new Error('name must be set');
    }
    if (!price) {
      throw new Error('price must be set');
    }

    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }
}
