const Carrito = require('../carrito');

describe('Testing Carrito class', () => {
  it('should create a carrito object with items property', () => {
    let carrito = new Carrito();
    expect(carrito).toMatchObject({items: []})
    expect(carrito.items).toBeDefined();
    expect(carrito.item).not.toBeDefined();
  })

  
})

describe('Testing addProduct', () => {
  it('should add a product to the cart', () => {
    let carrito = new Carrito();
    carrito.addProduct({'item': 'agua', 'price': 10})
    expect(carrito.items).toContainEqual({'item':'agua', 'price': 10})
  })
})

describe('Testing removeProduct', () => {
  it('should remove a product from the cart', () => {
    let carrito = new Carrito();
    carrito.addProduct({'item': 'agua', 'price': 10})
    carrito.removeProduct({'item': 'agua', 'price': 10})
    expect(carrito.items.length).toBe(0)
  })
})

describe('Testing getTotalItems', () => {
  it('should return all products from the cart', () => {
    let carrito = new Carrito();
    carrito.addProduct({'item': 'agua', 'price': 10})
    carrito.addProduct({'item': 'pizza', 'price': 20})
    var total = carrito.getTotalItems()
    expect(total).toEqual(2)
  })
})

describe('Testing getTotalItems', () => {
  it('should return all products from the cart', () => {
    let carrito = new Carrito();
    carrito.addProduct({'item': 'agua', 'price': 10})
    carrito.addProduct({'item': 'pizza', 'price': 20})
    let checkout = 0;
    for (let index = 0; index < carrito.items.length; index++) {
      checkout = checkout + carrito.items[index].price;
    }
    const totalprecio = carrito.getTotalCheckout();

    expect(totalprecio).toEqual(checkout)
  })
})

