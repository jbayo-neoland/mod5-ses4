const Coupon = require('../coupon');

describe('testing coupon class', () => {
  let couponExpired = {};
  let couponNotExpired = {};
  let couponNullExpired = {};
  beforeAll(() => {
    couponExpired = new Coupon(1,'a',10,null,false, false, new Date('2021-03-01'));
    couponNotExpired = new Coupon(1,'a',10,null,false, false, new Date('2022-04-01'));
    couponNullExpired = new Coupon(1,'a',10,null,false, false,null);

  })
  describe('testing isValid with Promise', () => {
    it('should throw an error for a coupon with expire_date < now', () => {
      expect.assertions(1);
      return couponExpired.isValid().catch(e => expect(e).toMatch('coupon expired'));
    })
    it('should resolve as true for a coupoon with expire_date > now', () => {
      return couponNotExpired.isValid().then(data => {
        expect(data).toBeTruthy();
      });
    })
    it('should resolve as true for a coupoon with expire_date = null', () => {
      return couponNullExpired.isValid().then(data => {
        expect(data).toBeTruthy();
      });
    })
  })
  describe('testing isValid with reject / resolves', () => {
    it('should throw an error for a coupon with expire_date < now', () => {
      return expect(couponExpired.isValid()).rejects.toMatch('coupon expired');
    })
    it('should resolve as true for a coupoon with expire_date > now', () => {
      return expect(couponNotExpired.isValid()).resolves.toBeTruthy();
    })
    it('should resolve as true for a coupoon with expire_date = null', () => {
      return expect(couponNullExpired.isValid()).resolves.toBeTruthy();
    })
  })
  describe('testing isValid with async / await', () => {
    it('should throw an error for a coupon with expire_date < now', async () => {
      expect.assertions(1);
      try{
        await couponExpired.isValid();
      } catch(e){
        expect(e).toMatch('coupon expired')
      }
    })
    it('should resolve as true for a coupoon with expire_date > now', async () => {
      expect.assertions(1);
      try{
        const isValid = await couponNotExpired.isValid();
        expect(isValid).toBeTruthy();
      } catch(e){
      }
    })
    it('should resolve as true for a coupoon with expire_date = null', async () => {
      expect.assertions(1);
      try{
        const isValid = await couponNullExpired.isValid();
        expect(isValid).toBeTruthy();
      } catch(e){
      }
    })
  })
})
