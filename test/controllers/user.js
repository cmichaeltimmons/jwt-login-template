
var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var app = require('../../server.js');

process.env.NODE_ENV = 'test'
const knex = require('../../db')()

describe('POST /login', function () {

  beforeEach(() => knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run())
  )

  afterEach(function (done) {
    knex.migrate.rollback()
      .then(function () {
        done();
      });
  });

  it('it responds with 401 status code if bad username or password', function (done) {
    request(app)
      .post('/login')
      .type('json')
      .send('{"username":"bad","password":"wrong"}')
      .expect(401)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it.only('it responds with 200 status code if good username or password', function (done) {
    request(app)
      .post('/login')
      .type('json')
      .send('{"username":"admin","password":"admin"}')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('it returns JWT token if good username or password', function (done) {
    request(app)
      .post('/login')
      .type('json')
      .send('{"username":"admin","password":"admin"}')
      .end(function (err, res) {
        if (err) return done(err)

        expect(res.body).have.property('jwt');

        done();
      });
  });
});

describe('POST /user', function () {
  it('should create a user', function () {
    request(app)
      .post('/user')
      .type('json')
      .send('{"username":"testPostUserName", "password":"testPostPassword"}')
      .end(function (err, res) {
        if (err) return done(err)

        expect(res.status).to.equal(201)

        done();
      })
  })

})