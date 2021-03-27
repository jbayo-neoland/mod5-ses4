const Carrito = require('../carrito');
const Product = require('../product');

describe('Testing Carrito class', () => {
  let carrito = {};

  let switchProduct = new Product(1, 'Switch', 239, 'console');
  let segaProduct = new Product(2, 'Sega', 99, 'console');
  let incorrectItem = {id: 2, productName: 'Sega', price: 99};

  beforeEach(() => {
    carrito = new Carrito();
  })

  it('should create a carrito object with items property', () => {
    expect(carrito).toMatchObject({items: []})
    expect(carrito.items).toBeDefined();
    expect(carrito.item).not.toBeDefined();
  })

  describe('testing addProduct', () => {

    // Tests added:
    it('should throw an error if we add a product that is not an object', () => {
      expect(() => carrito.addProduct('')).toThrow('product must be an object');
    })

    it('should throw an error if we add a product that is not a product object', () => {
      expect(() => carrito.addProduct(incorrectItem)).toThrow('product is not of type Product');
    })

    it('should return a new added product', () => {
      expect(carrito.addProduct(switchProduct)).toMatchObject(switchProduct);
    })

    it("should have the added product in carrito.items", () => {
      carrito.addProduct(segaProduct);
      expect(carrito.items).toContainEqual(segaProduct);
    });

    // --------------

    xit('should have one product after adding one product', () => {
       carrito.addProduct(switchProduct);
       expect(carrito.items.length).toBe(1)
    });

    xit('should have 3 products after adding 3 product', () => {
      carrito.addProduct(switchProduct);
      carrito.addProduct(switchProduct);
      carrito.addProduct(segaProduct);
      expect(carrito.items.length).toBe(3)
    });

    it('should have ids [1,1,2] when adding switch, switch, sega', () => {
      carrito.addProduct(switchProduct);
      carrito.addProduct(switchProduct);
      carrito.addProduct(segaProduct);
      const ids = carrito.items.map(e => e.id);
      expect(ids).toEqual([1,1,2])
      // ids.forEach((id, i) => {
      //   expect(id).toBe([1,1,2][i]);
      // })
    });

    it('should have a product with name Switch', () => {
      carrito.addProduct(switchProduct);
      expect(carrito.items[0].name).toEqual('Switch')
    });

    it('should have a product with name Sega', () => {
      carrito.addProduct(segaProduct);
      expect(carrito.items[0].name).toEqual('Sega')
    })

  });

  describe('testing removeProduct', () => {
    it('should throw an error when trying to remove an object that is not a Product', () => {

      expect(() => carrito.removeProduct({id: 1, name: ''})).toThrow('product is not of type Product');
    })

    it('should have 1 product when removing a product from a list of switch, sega', () => {
      const switchProduct1 = carrito.addProduct(switchProduct);
      const segaProduct1 = carrito.addProduct(segaProduct);
      carrito.removeProduct(switchProduct1)
      expect(carrito.items.length).toBe(1);
    })

    it('should have a product with name Switch when removing a segaProduct from a list of switch, sega', () => {
      const switchProduct1 = carrito.addProduct(switchProduct);
      const segaProduct1 = carrito.addProduct(segaProduct);
      carrito.removeProduct(segaProduct1)
      expect(carrito.items[0].name).toEqual('Switch');
    })

    it('should have 2 products with when removing a switchProduct from a list of switch, switch, sega', () => {
      const switchProduct1 = carrito.addProduct(switchProduct);
      const segaProduct1 = carrito.addProduct(segaProduct);
      let newSwitchProduct = Object.assign(Object.create(Object.getPrototypeOf(switchProduct)), switchProduct)
      const switchProduct2 = carrito.addProduct(newSwitchProduct);
      // const switchProduct2 = carrito.addProduct(switchProduct);
      carrito.removeProduct(switchProduct2)
      expect(carrito.items.length).toEqual(2);
    })

  })

  describe('testing getTotalItems', () => {
    it('should return 0 for an empty carrito', () => {
      expect(carrito.getTotalItems()).toBe(0)
    });
    it('should return >=0 for any state of carrito', () => {
      carrito.addProduct(switchProduct);
      carrito.addProduct(switchProduct);
      expect(carrito.getTotalItems()).toBeGreaterThanOrEqual(0);

      carrito.removeProduct(segaProduct);
      expect(carrito.getTotalItems()).toBeGreaterThanOrEqual(0);

      carrito.addProduct(segaProduct);
      expect(carrito.getTotalItems()).toBeGreaterThanOrEqual(0);

      carrito.removeProduct(segaProduct);
      expect(carrito.getTotalItems()).toBeGreaterThanOrEqual(0);

      carrito.removeProduct(switchProduct);
      carrito.removeProduct(switchProduct);
      carrito.removeProduct(switchProduct);
      carrito.removeProduct(switchProduct);
      carrito.removeProduct(switchProduct);
      carrito.removeProduct(switchProduct);
      carrito.removeProduct(segaProduct);
      carrito.removeProduct(segaProduct);
      expect(carrito.getTotalItems()).toBeGreaterThanOrEqual(0);
    });

    it('should return 2 when adding 2 products to an empty carrito', () => {
      carrito.addProduct(segaProduct);
      carrito.addProduct(segaProduct);
      expect(carrito.getTotalItems()).toBe(2);
    })
  })

  describe('testing getTotalCheckout', () => {
    it('should return 0 for an empty carrito', () => {
      expect(carrito.getTotalCheckout()).toBe(0);
    })
    it('should return 239 for a carrito with a switch', () => {
      carrito.addProduct(switchProduct);
      expect(carrito.getTotalCheckout()).toBe(239);
    })
    it('should return 99 for a carrito with a switch', () => {
      carrito.addProduct(segaProduct);
      expect(carrito.getTotalCheckout()).toBe(99);
    })
    it('should return 338 for a carrito with a switch and a sega', () => {
      carrito.addProduct(segaProduct);
      carrito.addProduct(switchProduct);
      expect(carrito.getTotalCheckout()).toBe(338);
    })
  })

})
