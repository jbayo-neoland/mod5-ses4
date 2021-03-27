const {sum} = require('../sum');
describe('sum function', () => {
  it('should return 4 to 2+2', () => {
    expect(sum(2,2)).toBe(4);
  })
  it('should return 23 to 21+2', () => {
    expect(sum(21,2)).toBe(23);
  })
  it('should return 6 to 1+2+3', () => {
    expect(sum(1,2,3)).toBe(6);
  })
  it('should return 0 to empty values', () => {
    expect(sum()).toBe(0);
  })
  it('should return 14 to 1+10+2+3-2', () => {
    expect(sum(1, 10, 2, 3, -2)).toBe(14);
  })
})
