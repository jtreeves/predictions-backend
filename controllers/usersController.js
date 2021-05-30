const postSignup = require('./users/postSignup')
const postLogin = require('./users/postLogin')
const getUser = require('./users/getUser')
const putName = require('./users/putName')
const putEmail = require('./users/putEmail')
const deleteUser = require('./users/deleteUser')

const usersController = {
    postSignup,
    postLogin,
    getUser,
    putName,
    putEmail,
    deleteUser
}

module.exports = usersController