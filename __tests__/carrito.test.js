const Carrito = require('../carrito');

describe('Testing Carrito class', () => {
  it('should create a carrito object with items property', () => {
    let carrito = new Carrito();
    expect(carrito).toMatchObject({
      items: []
    })
    expect(carrito.items).toBeDefined();
    expect(carrito.item).not.toBeDefined();
  })
  it('should add product to carrito', () => {
    let product = {
      "id": "23123",
      "price": 32
    };
    let carrito = new Carrito();
    let newProduct = {
      name: "product1",
      price: 10
    };
    carrito.addProduct(newProduct);
    expect(carrito.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining(newProduct)
      ])
    )

  })
  it('should remove product to carrito', () => {
    let product = {
      "id": "23123",
      "price": 32
    };
    let carrito = new Carrito();
    let newProduct = {
      name: "product1",
      price: 10
    };
    carrito.addProduct(newProduct);
    carrito.removeProduct(newProduct);
    expect(carrito.items).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining(newProduct)
      ])
    )

  })
  it('should return totalItems', () => {
    let carrito = new Carrito();
    let newProduct = {
      name: "product1",
      price: 10
    };
    carrito.addProduct(newProduct);
    carrito.addProduct(newProduct);
    carrito.addProduct(newProduct);
    let total = carrito.getTotalItems();
    expect(total).toEqual(3);
  });

  it('should return checkout', () => {
    let carrito = new Carrito();
    let newProduct = {
      name: "product1",
      price: 10
    };
    let newProduct2 = {
      name: "product2",
      price: 30
    };
    carrito.addProduct(newProduct);
    carrito.addProduct(newProduct2);
    let checkout = carrito.getTotalCheckout();
    expect(checkout).toEqual(40);
  });


})