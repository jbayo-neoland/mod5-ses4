const axios = require('axios');

const END_POINT = 'https://jsonplaceholder.typicode.com';
class User {

  static all() {
    return axios.get(`${END_POINT}/users`).then(resp => resp.data);
  }
}

module.exports = User;
