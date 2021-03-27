const axios = require('axios');
const User = require('../user');

jest.mock('axios');

describe('testing mock axios', () => {
  test('should fetch users', () => {
    const users = [{name: 'Bob'}];
    const resp = {data: users};
    axios.get.mockResolvedValue(resp);

    // or you could use the following depending on your use case:
    // axios.get.mockImplementation(() => Promise.resolve(resp))

    return User.all().then(data => {
      console.log(data)
      return expect(data).toEqual(users)
    });
  });
})
