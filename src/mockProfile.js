var Mock = require('mockjs')

const profile = Mock.mock({
  "data|50": [
    {
      'str|+1': 1,
      'int|+1': 1,
      'agi|+1': 1,
      'luk|+1': 1,
    }
  ]
});

module.exports = profile;