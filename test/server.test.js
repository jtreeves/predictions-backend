// Import external dependencies
const request = require('supertest')
const expect = require('chai').expect

// Import internal dependencies
const app = require('../server')
const db = require('../models')

// Delete all existing users and budgets before running tests
before(async () => {
    await db.User.deleteMany({})
    await db.Prediction.deleteMany({})
})

// Create new users
before(async () => {
    await request(app)
        .post('/users/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: 'Rebecca Black',
            email: 'rebecca@email.com',
            password: 'rebecca1234'
        })

    await request(app)
        .post('/users/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: 'Victoria McMillan',
            email: 'victoria@email.com',
            password: 'victoria1234'
        })

    await request(app)
        .post('/users/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: 'Robert Robertson',
            email: 'robert@email.com',
            password: 'robert1234'
        })
})

// Log in newly created user
before(async () => {
    await request(app)
        .post('/users/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            email: 'rebecca@email.com',
            password: 'rebecca1234'
        })
})

// Test home page
describe('SERVER: GET route for /', () => {
    it('accesses backend and displays stored message', async () => {
        const user = await request(app)
            .get('/')
            .set('Content-Type', 'application/x-www-form-urlencoded')
        expect(user.status).to.equal(200)
        expect(user.body.msg).to.equal('Viewing the backend of the Tiresias app')
    })
})