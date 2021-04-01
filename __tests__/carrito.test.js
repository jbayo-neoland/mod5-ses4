const Carrito = require('../carrito');
const Product = require('../product');
const Coupon = require('../coupon');

describe('Testing Carrito class', () => {
  let carrito = {};

  let switchProduct = new Product(1, 'Switch', 239, 'console');
  let segaProduct = new Product(2, 'Sega', 99, 'console');
  let incorrectItem = {id: 2, productName: 'Sega', price: 99};

  let couponPercent = new Coupon(1, '10% off on consoles', 10, 'console', true, false);
  let couponTotal = new Coupon(2, '10€ off on consoles', 10, 'console', false, false);
  let couponUnique = new Coupon(3, '20€ off on total', 20, null, false, true);
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
    it('should return 215.1 for a carrito with switch and a 10% coupon discount for switch', () => {
      carrito.addProduct(switchProduct);
      carrito.addCoupon(couponPercent);
      expect(carrito.getTotalCheckout()).toBe(215.1);
    });
    it('should return 229 for a carrito with switch and a 10€ coupon discount for switch', () => {
      carrito.addProduct(switchProduct);
      carrito.addCoupon(couponTotal);
      expect(carrito.getTotalCheckout()).toBe(229);
    });
    it('should return 328 for a carrito with switch and sega and a 10€ coupon discount for switch', () => {
      carrito.addProduct(switchProduct);
      carrito.addProduct(segaProduct);
      carrito.addCoupon(couponTotal);
      expect(carrito.getTotalCheckout()).toBe(328);
    });
    it('should return 318 for a carrito with switch and sega and a 20€ coupon discount for switch', () => {
      carrito.addProduct(switchProduct);
      carrito.addProduct(segaProduct);
      carrito.addCoupon(couponUnique);
      expect(carrito.getTotalCheckout()).toBe(318);
    });
  })

  describe('testing addCoupon', () => {
    it('should throw an error when trying to add something that is not a coupon object', () => {
      expect(() => carrito.addCoupon('')).toThrow('coupon is not of type Coupon');
      expect(() => carrito.addCoupon({id: ''})).toThrow('coupon is not of type Coupon');
    });
    it('should return an added coupon', () => {
      let c = carrito.addCoupon(couponUnique);
      expect(c).toMatchObject(couponUnique);
    });
    it('carrito should contain an added coupon', () => {
      let c = carrito.addCoupon(couponUnique);
      expect(carrito.items).toContainEqual(couponUnique);
    });
    it('should throw an error when trying to add twice a coupon that is unique', () => {
      let c = carrito.addCoupon(couponUnique);
      expect(() => carrito.addCoupon(couponUnique)).toThrowError();
    });
    it('should throw an error when trying to add a coupon if we have already one that is unique', () => {
      let c = carrito.addCoupon(couponUnique);
      expect(() => carrito.addCoupon(couponPercent)).toThrowError();
    });
    it('should throw an error when trying to add a unique coupon if we have already one coupon', () => {
      let c = carrito.addCoupon(couponPercent);
      expect(() => carrito.addCoupon(couponUnique)).toThrowError();
    });
    xit(`should throw an error when trying to add an invalid coupon:
      Not responsibility of carrito to check if the coupon itself is valid or not, it should be part of an integration test`, () => {
      expect(() => carrito.addCoupon(couponUnique)).toThrowError();
    });
  });

  describe('testing removeCoupon', () => {
    it('should throw an error when trying to remove something that is not a coupon object', () => {
      expect(() => carrito.removeCoupon('')).toThrowError();
      expect(() => carrito.removeCoupon({})).toThrowError();
      expect(() => carrito.removeCoupon(segaProduct)).toThrowError();
      expect(() => carrito.removeCoupon(null)).toThrowError();
    });
    it('should remove an added coupon', () => {
      let coupon = carrito.addCoupon(couponTotal);
      let removedCoupon = carrito.removeCoupon(coupon);
      expect(carrito.items).not.toContainEqual(removedCoupon);
    });
  });

})
