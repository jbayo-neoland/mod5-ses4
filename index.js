const User = require('./user');

User.all().then(data => {
  console.log(data[0]);
})
