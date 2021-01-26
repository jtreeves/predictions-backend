// Import external dependencies
const request = require('supertest')
const expect = require('chai').expect

// Import internal dependencies
const app = require('../server')
const db = require('../models')

// Test POST route for users/signup
describe('USERS: POST route for /signup', () => {
    it('creates a new user and saves it to the database with a hashed password and a date field', async () => {
        const newUser = await request(app)
            .post('/users/signup')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                name: 'John Doe',
                email: 'john@email.com',
                password: 'john1234'
            })
        const foundUser = await db.User.findOne({
            email: 'john@email.com'
        })
        expect(newUser.status).to.equal(200)
        expect(foundUser).to.exist
        expect(foundUser.password).to.not.equal('john1234')
        expect(foundUser).to.have.property('date')
    })

    it('fails to create a user if email already in use', async () => {
        const newUser = await request(app)
            .post('/users/signup')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                name: 'Adam Smith',
                email: 'rebecca@email.com',
                password: 'adam1234'
            })
        expect(newUser.body.msg).to.equal('Email already in use')
    })
})

// Test POST route for users/login
describe('USERS: POST route for /login', () => {
    it('authenticates a user with the correct email-password combination', async () => {
        const currentUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: 'John Doe',
                password: 'john@email.com'
            })
        expect(currentUser.status).to.equal(200)
    })

    it('fails to authenticate a user without the correct email-password combination', async () => {
        const currentUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: 'victoria@email.com',
                password: 'notcorrectpassword'
            })
        expect(currentUser.body.msg).to.equal('Password is incorrect')
    })

    it('rejects a user without an existing account', async () => {
        const currentUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: 'susan@email.com',
                password: 'susan1234'
            })
        expect(currentUser.body.msg).to.equal('User not found')
    })
})

// Test GET route for users/:id
describe('USERS: GET route for /:id', () => {
    it('displays info of authenticated user', async () => {
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
        const currentUser = await request(app)
            .get(`/users/${foundUser._id}`)
            .set('Authorization', loggedUser.body.token)
        expect(currentUser.body.user).to.have.property('_id')
    })

    it('fails to display info of unauthenticated user', async () => {
        const foundUser = await db.User.findOne({
            email: 'robert@email.com'
        })
        const currentUser = await request(app)
            .get(`/users/${foundUser._id}`)
            .set('Authorization', 'Bearer token')
        expect(currentUser.error).to.not.equal(false)
    })
})