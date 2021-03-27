module.exports = {
  sum: (...array) => {
    return array.reduce((acc, curr) => acc += curr, 0);
  }
}
