const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const bathroomsRouter = require('../src/bathrooms/bathrooms-router')
const { makeBathroomsArray, makeMaliciousBathroom } = require('./bathrooms.fixtures')
const { makeUsersArray } = require('./users.fixtures')

describe('Bathrooms Endpoints', function() {
    let db
    
    before('make knex instance', () => {

        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db.raw('TRUNCATE bathrooms, users RESTART IDENTITY CASCADE'))

    afterEach('cleanup',() => db.raw('TRUNCATE bathrooms, users RESTART IDENTITY CASCADE'))


    describe(`GET /api/bathrooms`, () => {
        context(`Given no bathrooms`, () => {
          it(`responds with 200 and an empty list`, () => {
            return supertest(app)
              .get('/api/bathrooms')
              .expect(200, [])
          })
        })
    
        context('Given there are bathrooms in the database', () => {
          const testUsers = makeUsersArray();
          const testBathrooms = makeBathroomsArray();
    
          beforeEach('insert bathrooms', () => {
            return db
              .into('users')
              .insert(testUsers)
              .then(() => {
                return db
                  .into('bathrooms')
                  .insert(testBathrooms)
              })
          })
    
          it('responds with 200 and all of the bathrooms', () => {
            return supertest(app)
              .get('/api/bathrooms')
              .expect(200, testBathrooms)
          })
        })
    
        context(`Given an XSS attack bathroom`, () => {
          const testUsers = makeUsersArray();
          const { maliciousBathroom, expectedBathroom } = makeMaliciousBathroom()
    
          beforeEach('insert malicious bathroom', () => {
            return db
              .into('users')
              .insert(testUsers)
              .then(() => {
                return db
                  .into('bathrooms')
                  .insert( [maliciousBathroom] )
              })
          })
    
          it('removes XSS attack content', () => {
            return supertest(app)
              .get(`/api/bathrooms`)
              .expect(200)
              .expect(res => {
                expect(res.body[0].br_name).to.eql(expectedBathroom.br_name)
                expect(res.body[0].description).to.eql(expectedBathroom.description)
              })
          })
        })
      })

    describe(`GET /api/bathrooms/:bathroom_id`, () => {
        context(`Given no bathrooms`, () => {
          it(`responds with 404`, () => {
            const bathroomId = 123456
            return supertest(app)
              .get(`/api/bathrooms/${bathroomId}`)
              .expect(404, { error: { message: `Bathroom doesn't exist` } })
          })
        })
    
        context('Given there are bathrooms in the database', () => {
          const testUsers = makeUsersArray();
          const testBathrooms = makeBathroomsArray()
    
          beforeEach('insert bathrooms', () => {
            return db
              .into('users')
              .insert(testUsers)
              .then(() => {
                return db
                  .into('bathrooms')
                  .insert(testBathrooms)
              })
          })
    
          it('responds with 200 and the specified bathroom', () => {
            const bathroomId = 'QXJjaWxsYSBQbGF5Z3JvdW5k'
            const expectedBathroom = testBathrooms[0]
            return supertest(app)
              .get(`/api/bathrooms/${bathroomId}`)
              .expect(200, expectedBathroom)
          })
        })
    
        context(`Given an XSS attack bathroom`, () => {
            const testUsers = makeUsersArray();
            const { maliciousBathroom, expectedBathroom } = makeMaliciousBathroom()
      
            beforeEach('insert malicious bathroom', () => {
              return db
                .into('users')
                .insert(testUsers)
                .then(() => {
                  return db
                    .into('bathrooms')
                    .insert( [maliciousBathroom] )
                })
            })
      
            it('removes XSS attack content', () => {
              return supertest(app)
                .get(`/api/bathrooms`)
                .expect(200)
                .expect(res => {
                  expect(res.body[0].br_name).to.eql(expectedBathroom.br_name)
                  expect(res.body[0].description).to.eql(expectedBathroom.description)
                })
            })
          })
        })
    describe(`POST /api/bathrooms`, () => {
        const testUsers = makeUsersArray();
        beforeEach('insert malicious bathroom', () => {
          return db
            .into('users')
            .insert(testUsers)
        })
    
        it(`creates an bathroom, responding with 201 and the new bathroom`, () => {
          const newBathroom = {
            id: 'diowl89sE',
            br_name: 'brooklyn',
            lat: '40.678200',
            lng: '-73.944200',
            description: 'brooklyn',
            user_id: 1,
            category: 'user_added',

          }
          return supertest(app)
            .post('/api/bathrooms')
            .send(newBathroom)
            .expect(201)
            .expect(res => {
              expect(res.body.br_name).to.eql(newBathroom.br_name)
              expect(res.body.lat).to.eql(newBathroom.lat)
              expect(res.body.lng).to.eql(newBathroom.lng)
              expect(res.body.description).to.eql(newBathroom.description)
              expect(res.body.user_id).to.eql(newBathroom.user_id)
              expect(res.body.category).to.eql(newBathroom.category)
              expect(res.body).to.have.property('id')
              expect(res.headers.location).to.eql(`/api/bathrooms/${res.body.id}`)
            //   const expected = new Intl.DateTimeFormat('en-US').format(new Date())
            //   const actual = new Intl.DateTimeFormat('en-US').format(new Date(res.body.date_published))
              //expect(actual).to.eql(expected)
            })
            .then(res =>
              supertest(app)
                .get(`/api/bathrooms/${res.body.id}`)
                .expect(res.body)
            )
        })
    
        const requiredFields = ['id', 'br_name', 'lat', 'lng', 'user_id', 'category']
    
        requiredFields.forEach(field => {
          const newBathroom = {
            id: 'diowl89sE',
            br_name: 'brooklyn',
            lat: 40.6782,
            lng: -73.9442,
            description: 'brooklyn',
            user_id: 1,
            category: 'user_added',
          }
    
          it(`responds with 400 and an error message when the '${field}' is missing`, () => {
            delete newBathroom[field]
    
            return supertest(app)
              .post('/api/bathrooms')
              .send(newBathroom)
              .expect(400, {
                error: { message: `Missing '${field}' in request body` }
              })
          })
        })
    
        it('removes XSS attack content from response', () => {
          const { maliciousBathroom, expectedBathroom } = makeMaliciousBathroom()
          return supertest(app)
            .post(`/api/bathrooms`)
            .send(maliciousBathroom)
            .expect(201)
            .expect(res => {
              expect(res.body.br_name).to.eql(expectedBathroom.br_name)
              expect(res.body.description).to.eql(expectedBathroom.description)
            })
        })
      })
    
    describe(`DELETE /api/bathrooms/:bathroom_id`, () => {
        context(`Given no bathrooms`, () => {
          it(`responds with 404`, () => {
            const bathroomId = 123456
            return supertest(app)
              .delete(`/api/bathrooms/${bathroomId}`)
              .expect(404, { error: { message: `Bathroom doesn't exist` } })
          })
        })
    
        context('Given there are bathrooms in the database', () => {
          const testUsers = makeUsersArray();
          const testBathrooms = makeBathroomsArray()
    
          beforeEach('insert bathrooms', () => {
            return db
              .into('users')
              .insert(testUsers)
              .then(() => {
                return db
                  .into('bathrooms')
                  .insert(testBathrooms)
              })
          })
    
          it('responds with 204 and removes the bathroom', () => {
            const idToRemove = 'faijsdfilok'
            const expectedBathrooms = testBathrooms.filter(bathroom => bathroom.id !== idToRemove)
            return supertest(app)
              .delete(`/api/bathrooms/${idToRemove}`)
              .expect(204)
              .then(res =>
                supertest(app)
                  .get(`/api/bathrooms`)
                  .expect(expectedBathrooms)
              )
          })
        })
      })
    
    describe(`PATCH /api/bathrooms/:bathroom_id`, () => {
        context(`Given no bathrooms`, () => {
          it(`responds with 404`, () => {
            const bathroomId = 123456
            return supertest(app)
              .delete(`/api/bathrooms/${bathroomId}`)
              .expect(404, { error: { message: `Bathroom doesn't exist` } })
          })
        })
    
        context('Given there are bathrooms in the database', () => {
          const testUsers = makeUsersArray();
          const testBathrooms = makeBathroomsArray()
    
          beforeEach('insert bathrooms', () => {
            return db
              .into('users')
              .insert(testUsers)
              .then(() => {
                return db
                  .into('bathrooms')
                  .insert(testBathrooms)
              })
          })
    
          it('responds with 204 and updates the bathroom', () => {
            const idToUpdate = 'faijsdfilok'
            const updateBathroom = {
              br_name: 'updated bathroom name',
              description: 'updated bathroom description',
            }
            const expectedBathroom = {
              ...testBathrooms[1],
              ...updateBathroom
            }
            return supertest(app)
              .patch(`/api/bathrooms/${idToUpdate}`)
              .send(updateBathroom)
              .expect(204)
              .then(res =>
                supertest(app)
                  .get(`/api/bathrooms/${idToUpdate}`)
                  .expect(expectedBathroom)
              )
          })
    
          it(`responds with 400 when no required fields supplied`, () => {
            const idToUpdate = 'faijsdfilok'
            return supertest(app)
              .patch(`/api/bathrooms/${idToUpdate}`)
              .send({ irrelevantField: 'foo' })
              .expect(400, {
                error: {
                  message: `Request body must contain either 'name' or 'description'`
                }
              })
          })
    
          it(`responds with 204 when updating only a subset of fields`, () => {
            const idToUpdate = 'faijsdfilok'
            const updateBathroom = {
              br_name: 'updated bathroom name',
            }
            const expectedBathroom = {
              ...testBathrooms[1],
              ...updateBathroom
            }
    
            return supertest(app)
              .patch(`/api/bathrooms/${idToUpdate}`)
              .send({
                ...updateBathroom,
                fieldToIgnore: 'should not be in GET response'
              })
              .expect(204)
              .then(res =>
                supertest(app)
                  .get(`/api/bathrooms/${idToUpdate}`)
                  .expect(expectedBathroom)
              )
          })
        })
      })
})