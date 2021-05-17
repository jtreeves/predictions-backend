// Import external dependencies
require('dotenv').config()
const express = require('express')
const passport = require('passport')
const createUser = require('../services/users/createUser')
const createSession = require('../services/users/createSession')
const getUser = require('../services/users/getUser')
const updateName = require('../services/users/updateName')
const updateEmail = require('../services/users/updateEmail')
const deleteUser = require('../services/users/deleteUser')

// Create router
const router = express.Router()

// Create POST route for users/signup (Public)
router.post('/signup', async (req, res) => {
    try {
        const newUser = await createUser(req.body.name, req.body.email, req.body.password)
        res.status(201).json({user: newUser})
    } catch (error) {
        res.status(400).json({msg: error})
    }
})

// Create POST route for users/login (Public)
router.post('/login', async (req, res) => {
    try {
        const newSession = await createSession(
            req.body.email, req.body.password
        )
        res.status(201).json(newSession)
    } catch (error) {
        res.status(400).json({msg: error})
    }
})

// Create GET route for users/:id (Private)
router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const currentUser = await getUser(req.params.id)
        res.status(200).json({user: currentUser})
    } catch (error) {
        res.status(400).json({msg: error})
    }
})

// Create PUT route for users/:id/name (Private)
router.put('/:id/name', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const updatedUser = await updateName(
            req.params.id, req.body.name
        )
        res.status(200).json({user: updatedUser})
    } catch (error) {
        res.status(400).json({msg: error})
    }
})

// Create PUT route for users/:id/email (Private)
router.put('/:id/email', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const updatedUser = await updateEmail(
            req.params.id, req.body.email
        )
        res.status(200).json({user: updatedUser})
    } catch (error) {
        res.status(400).json({msg: error})
    }
})

// Create DELETE route for users/:id (Private)
router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const deletion = await deleteUser(req.params.id)
        res.status(204).json({msg: deletion})
    } catch (error) {
        res.status(400).json({msg: error})
    }
})

// Export router
module.exports = router