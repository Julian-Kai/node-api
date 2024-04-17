var Mock = require('mockjs')

const heroes = Mock.mock({
  "data|50": [
    {
      'id|+1': 1,
      name: "@name()",
      image: "http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg"
    }
  ]
});

module.exports = heroes;