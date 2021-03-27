const Carrito = require("../carrito");

describe("Testing Carrito class", () => {
  it("should create a carrito object with items property", () => {
    let carrito = new Carrito();
    expect(carrito).toMatchObject({ items: [] });
    expect(carrito.items).toBeDefined();
    expect(carrito.item).not.toBeDefined();
  });
});

describe("Testing addProduct", () => {
  it("inside addProduct", () => {
    let carrito = new Carrito();
    carrito.addProduct({ item: "movil" });
    expect(carrito.items).toContainEqual({ item: "movil" });
  });
});

describe("Testing removeProduct", () => {
  it("inside removeProduct", () => {
    let carrito = new Carrito();
    carrito.addProduct({ item: "movil" });
    carrito.removeProduct({ item: "movil" });
    expect(carrito.items.length).toBe(0);
  });
});

describe("Testing getTotalItems", () => {
  it("inside getTotalItems", () => {
    let carrito = new Carrito();
    carrito.addProduct({ item: "movil" });
    carrito.addProduct({ item: "portatil" });
    let total = carrito.getTotalItems();
    expect(total).toEqual(carrito.items.length);
  });
});

describe("Testing getTotalCheckOut", () => {
  it("should return all products from the cart", () => {
    let carrito = new Carrito();
    carrito.addProduct({ item: "agua", price: 10 });
    carrito.addProduct({ item: "pizza", price: 20 });
    let checkout = 0;
    for (let index = 0; index < carrito.items.length; index++) {
      checkout = checkout + carrito.items[index].price;
    }
    const totalprecio = carrito.getTotalCheckOut();
    expect(totalprecio).toEqual(30);
  });
});
