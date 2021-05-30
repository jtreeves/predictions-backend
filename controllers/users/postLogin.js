const createPayload = require('../../services/users/createPayload')

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

async function postLogin(req, res) {
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

module.exports = postLogin