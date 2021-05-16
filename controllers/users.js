// Import external dependencies
require('dotenv').config()
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

// Import internal models
const db = require('../models')

// Create router
const router = express.Router()

// Create JSON web token
const JWT_SECRET = process.env.JWT_SECRET

// Create POST route for users/signup (Public)
router.post('/signup', async (req, res) => {
    try {
        const currentUser = await db.User.findOne({
            email: req.body.email
        })
        if (!currentUser) {
            const newUser = new db.User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            bcrypt.genSalt(10, (error, salt) => {
                if (error) throw Error
                bcrypt.hash(newUser.password, salt, async (error, hash) => {
                    try {
                        if (error) throw Error
                        newUser.password = hash
                        const createdUser = await newUser.save()
                        res.status(201).json({user: createdUser})
                    } catch (error) {
                        res.status(500).json({msg: error})
                    }
                })
            })
        } else {
            res.status(409).json({msg: 'Email already in use'})
        }
    } catch (error) {
        res.status(400).json({msg: error})
    }
})

// Create POST route for users/login (Public)
router.post('/login', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const currentUser = await db.User.findOne({email})
        if (currentUser) {
            const isMatch = await bcrypt.compare(
                password, currentUser.password
            )
            if (isMatch) {
                const payload = {
                    id: currentUser.id,
                    email: currentUser.email,
                    name: currentUser.name
                }
                jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'}, (error, token) => {
                    res.status(201).json({
                        success: true,
                        token: `Bearer ${token}`
                    })
                })
            } else {
                res.status(401).json({msg: 'Password is incorrect'})
            }
        } else {
            res.status(404).json({msg: 'User not found'})
        }
    } catch (error) {
        res.status(400).json({msg: error})
    }
})

// Create GET route for users/:id (Private)
router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const currentUser = await db.User.findOne({
            _id: req.params.id
        })
        res.status(200).json({user: currentUser})
    } catch (error) {
        res.status(400).json({msg: error})
    }
})

// Create PUT route for users/:id/name (Private)
router.put('/:id/name', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const updatedUser = await db.User.updateOne(
            {_id: req.params.id},
            {$set: {name: req.body.name}}
        )
        res.status(200).json({user: updatedUser})
    } catch (error) {
        res.status(400).json({msg: error})
    }
})

// Create PUT route for users/:id/email (Private)
router.put('/:id/email', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const updatedUser = await db.User.updateOne(
            {_id: req.params.id},
            {$set: {email: req.body.email}}
        )
        res.status(200).json({user: updatedUser})
    } catch (error) {
        res.status(400).json({msg: error})
    }
})

// Create DELETE route for users/:id (Private)
router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        await db.Prediction.deleteMany({user: req.params.id})
        await db.User.deleteOne({_id: req.params.id})
        res.status(204).json({msg: 'User deleted'})
    } catch (error) {
        res.status(400).json({msg: error})
    }
})

// Export router
module.exports = router