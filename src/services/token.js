const jwt = require('jsonwebtoken')

const secret = 'jwtSecret'


function createToken(user) {
    const payload = {
        id: user._id,
        email: user.email
    }
    const token = jwt.sign(payload, secret, {expiresIn: '2d'})
    return token
}

function verifyToken(token) {
    const payload = jwt.verify(token,secret)
    return payload
}

module.exports = {
    createToken,
    verifyToken
}