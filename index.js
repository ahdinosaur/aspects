const before = require('./before')
const after = require('./after')
const around = require('./around')

module.exports = {
  before: before,
  after: after,
  around: around,

  sync: {
    before: before.sync,
    after: after.sync,
    around: around.sync
  },
  async: {
    before: before.async,
    after: after.async,
    around: around.async
  }
}

