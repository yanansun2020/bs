
const FakeDB = require('../../fakedb')

class Model {
  static db = FakeDB

  /* virtual */
  static getAll = () => {}
  static getOneById = (id) => {}
}

module.exports = Model
