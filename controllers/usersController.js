const createUser = require('../services/users/createUser')
const createPayload = require('../services/users/createPayload')
const readUser = require('../services/users/readUser')
const updateName = require('../services/users/updateName')
const updateEmail = require('../services/users/updateEmail')
const destroyUser = require('../services/users/destroyUser')

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const usersController = {}

usersController.postSignup = async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    try {
        await createUser(name, email, password)
        res.status(201).json({msg: 'New user created'})
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'User not created'
        }
        res.status(error.code).json({msg: error.message})
    }
}

usersController.postLogin = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const payload = await createPayload(email, password)
        jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'}, (error, token) => {
            res.status(201).json({
                success: true,
                token: `Bearer ${token}`
            })
        })
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'User not logged in'
        }
        res.status(error.code).json({msg: error.message})
    }
}

usersController.getUser = async (req, res) => {
    const id = req.params.id
    try {
        const currentUser = await readUser(id)
        res.status(200).json({user: currentUser})
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'User information not retrieved'
        }
        res.status(error.code).json({msg: error.message})
    }
}

usersController.putName = async (req, res) => {
    const id = req.params.id
    const name = req.body.name
    try {
        const updatedUser = await updateName(id, name)
        res.status(200).json({user: updatedUser})
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'Name not updated'
        }
        res.status(error.code).json({msg: error.message})
    }
}

usersController.putEmail = async (req, res) => {
    const id = req.params.id
    const email = req.body.email
    try {
        const updatedUser = await updateEmail(id, email)
        res.status(200).json({user: updatedUser})
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'Email not updated'
        }
        res.status(error.code).json({msg: error.message})
    }
}

usersController.deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        const deletion = await destroyUser(id)
        res.status(204).json({msg: deletion})
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'User not deleted'
        }
        res.status(error.code).json({msg: error.message})
    }
}

module.exports = usersController