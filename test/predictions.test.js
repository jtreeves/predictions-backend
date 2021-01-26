// Import external dependencies
const request = require('supertest')
const expect = require('chai').expect

// Import internal dependencies
const app = require('../server')
const db = require('../models')

// Test POST route for predictions/:id
describe('PREDICTIONS: POST route for /:id', () => {
    it('creates a new prediction for an existing user and saves it to the database', async () => {
        const loggedUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: 'victoria@email.com',
                password: 'victoria1234'
            })
        const foundUser = await db.User.findOne({
            email: 'victoria@email.com'
        })
        const newPrediction = await request(app)
            .post(`/predictions/${foundUser._id}`)
            .set('Authorization', loggedUser.body.token)
            .send({
                user: foundUser._id,
                regression: 1,
                title: 'Q3 Profits',
                sections: {
                    favorite: {graph: 'cubic'},
                    note: {comments: 'I like this'}
                }
            })
        const foundPredictions = await db.Prediction.find({
            user: foundUser._id
        })
        expect(newPrediction).to.exist
        expect(foundPredictions).to.have.lengthOf(1)
    })
})

// Test GET route for predictions/all/:id
describe('PREDICTIONS: GET route for /all/:id', () => {
    it('returns all predictions associated with a specific user', async () => {
        const loggedUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: 'victoria@email.com',
                password: 'victoria1234'
            })
        const foundUser = await db.User.findOne({
            email: 'victoria@email.com'
        })
        const foundPredictions = await db.Prediction.find({
            user: foundUser._id
        })
        const getPredictions = await request(app)
            .get(`/predictions/all/${foundUser._id}`)
            .set('Authorization', loggedUser.body.token)
        expect(getPredictions.body.predictions.length).to.equal(foundPredictions.length)
    })
})