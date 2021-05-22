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
    try {
        await createUser(req.body.name, req.body.email, req.body.password)
        res.status(201).json({msg: 'New user created'})
    } catch (error) {
        res.status(error.code).json({msg: error.message})
    }
}

usersController.postLogin = async (req, res) => {
    try {
        const payload = await createPayload(
            req.body.email, req.body.password
        )
        jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'}, (error, token) => {
            res.status(201).json({
                success: true,
                token: `Bearer ${token}`
            })
        })
    } catch (error) {
        res.status(error.code).json({msg: error.message})
    }
}

usersController.getUser = async (req, res) => {
    try {
        const currentUser = await readUser(req.params.id)
        res.status(200).json({user: currentUser})
    } catch (error) {
        res.status(400).json({msg: error})
    }
}

usersController.putName = async (req, res) => {
    try {
        const updatedUser = await updateName(
            req.params.id, req.body.name
        )
        res.status(200).json({user: updatedUser})
    } catch (error) {
        res.status(400).json({msg: error})
    }
}

usersController.putEmail = async (req, res) => {
    try {
        const updatedUser = await updateEmail(
            req.params.id, req.body.email
        )
        res.status(200).json({user: updatedUser})
    } catch (error) {
        res.status(error.code).json({msg: error.message})
    }
}

usersController.deleteUser = async (req, res) => {
    try {
        const deletion = await destroyUser(req.params.id)
        res.status(204).json({msg: deletion})
    } catch (error) {
        res.status(400).json({msg: error})
    }
}

module.exports = usersController