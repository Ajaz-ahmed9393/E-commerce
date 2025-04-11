const jwt = require('jsonwebtoken')

const gen = (user) => {
    return jwt.sign({ email: user.email, userid: user._id }, process.env.JWT_ENV)
}

module.exports.gen = gen