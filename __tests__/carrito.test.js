const Carrito = require('../carrito');

describe('Testing Carrito class', () => {
  it('should create a carrito object with items property', () => {
    let carrito = new Carrito();
    expect(carrito).toMatchObject({items: []})
    expect(carrito.items).toBeDefined();
    expect(carrito.item).not.toBeDefined();
  })

  
})
