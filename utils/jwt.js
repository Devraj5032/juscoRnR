const jwt = require('jsonwebtoken')

const generateToken = (username) => {
    return jwt.sign({username},process.env.JWT_SECRET,{expiresIn:"1d"})
}
module.exports = { generateToken }