const express = require('express');
const axios = require('axios');
const app = express();

const mockHero = require('./mockHero')
const mockProfile = require('./mockProfile')

let port = 3000;
let isMock = true;  // 控制使用 mockData 或是調用 hahow heroku api

const authMiddleware = async (req, res, next) => {
  const { headers } = req;
  const name = headers['name'];
  const password = headers['password'];
  req.isAuthenticated = false

  if (name && password) {
    const authHeaders = {
      'name': name,
      'password': password
    }

    const isAuth = (isMock ? getMockAuth(name, password) : axios.post('https://hahow-recruit.herokuapp.com/auth', {}, { headers: authHeaders }))
      .then(_ => {
        req.isAuthenticated = true
        next();
      })
      .catch(error => {
        console.error('error:', error);
        res.status(401).send('Authentication failed');
      });
  } else {
    next();
  }
};

const getMockAuth = async (name, password) => {
  if (name == 'hahow' && password == 'rocks') {
    return null
  } else {
    throw new Error('Authentication failed');
  }
}

const getMockHero = async (index) => {
  if (index) {
    return mockHero.data[index - 1]
  }
  return mockHero
}

const getMockProfile = async (index) => {
  return mockProfile.data[index - 1]
}

app.get('/heroes', authMiddleware, async (req, res) => {
  const isAuthenticated = req.isAuthenticated;

  (isMock ? getMockHero() : axios.get('https://hahow-recruit.herokuapp.com/heroes'))
    .then(response => {
      const heroData = response.data;

      if (isAuthenticated) {
        const profilePromises = heroData.map(async hero => {
          return isMock ? await getMockProfile(hero.id) : await axios.get(`https://hahow-recruit.herokuapp.com/heroes${hero.id}/profile`);
        });
        return Promise.all(profilePromises)
          .then(profileDataArray => {
            const heroesWithProfiles = heroData.map((hero, index) => {
              return {
                ...hero,
                profile: profileDataArray[index]
              };
            });

            res.json({ heroes: heroesWithProfiles });
          })
      } else {
        res.json({ heroes: heroData });
      }
    })
    .catch(error => {
      console.error('error:', error);
      res.status(500).json({ message: error.message });
    });
});

app.get('/heroes/:heroId', authMiddleware, async (req, res) => {
  const params = req.params;
  const isAuthenticated = req.isAuthenticated;

  (isMock ? getMockHero(params.heroId) : axios.get(`https://hahow-recruit.herokuapp.com/heroes/${params.heroId}`))
    .then(async response => {
      let heroData = response;

      if (isAuthenticated) {
        const profileData = isMock ? await getMockProfile(heroData.id) : await axios.get(`https://hahow-recruit.herokuapp.com/heroes${hero.id}/profile`)
        heroData = { ...heroData, profile: profileData }
      }
      res.json({ heroes: heroData })
    })
    .catch(error => {
      console.error('error:', error);
      res.status(500).json({ message: error.message });
    });
});

app.listen(port)