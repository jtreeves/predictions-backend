require('dotenv').config()
const express = require('express')
const practice = require('../middleware/practice')
const router = express.Router()

router.post('/', async (req, res) => {
    const number = req.body.number
    try {
        const result = practice(number)
        res.status(result.code).json({msg: result.message})
    } catch (error) {
        res.status(error.code).json({msg: error.message})
    }
})

module.exports = router