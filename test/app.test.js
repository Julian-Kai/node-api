const chai = require('chai');
const request = require("supertest");
const app = require('../src/app');

var expect = chai.expect;

describe('GET /heroes without authenticate', () => {
  it('should return heroes array of length is equal 50, and per element have 3 properties', (done) => {
    request(app)
      .get('/heroes')
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200)
        expect(res.body.heroes).to.be.an('array');
        expect(res.body.heroes.length).to.be.equal(50);
        res.body.heroes.forEach(hero => {
          const properties = Object.keys(hero);
          expect(properties.length).is.equal(3);
        });
        done();
      });
  });
});

describe('GET /heroes with authenticate', () => {
  it('should return heroes array of length is equal 50, and per element have 4 properties, and have the profile properties, and have str properties, and not equal 0', (done) => {
    request(app)
      .get('/heroes')
      .set({ 'name': 'hahow', 'password': "rocks" })
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200)
        expect(res.body.heroes).to.be.an('array');
        expect(res.body.heroes.length).to.be.equal(50);
        res.body.heroes.forEach(hero => {
          const properties = Object.keys(hero);
          expect(properties.length).is.equal(4);
          expect(hero).to.have.property('profile').that.is.an('object');
          expect(hero.profile).to.have.property('str').that.is.a('number').and.is.not.equal(0);
        });
        done();
      });
  });
});

describe('GET /heroes with authenticate', () => {
  it('should return error and statusCode is equal 401', (done) => {
    request(app)
      .get('/heroes')
      .set({ 'name': 'hahow', 'password': "hahow" })
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(401)
        done();
      });
  });
});

describe('GET /heroes/1 without authenticate', () => {
  it('should return a heroes of id is equal 1', (done) => {
    request(app)
      .get('/heroes/1')
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200)
        expect(res.body.heroes).to.be.property('id').be.equal(1);
        done();
      });
  });
});

describe('GET /heroes/2 with authenticate', () => {
  it('should return a heroes of id is equal 2 and a profile of str is equal 2', (done) => {
    request(app)
      .get('/heroes/2')
      .set({ 'name': 'hahow', 'password': "rocks" })
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200)
        expect(res.body.heroes).to.be.property('id').be.equal(2);
        expect(res.body.heroes.profile).to.be.property('str').be.equal(2);
        done();
      });
  });
});

describe('GET /heroes/:heroId with authenticate', () => {
  it('should return error and statusCode is equal 401', (done) => {
    request(app)
      .get('/heroes/1')
      .set({ 'name': 'hahow', 'password': "hahow" })
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(401)
        done();
      });
  });
});