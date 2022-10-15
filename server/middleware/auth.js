const jwt = require("jsonwebtoken")
const User = require("../models/user")

const authenticateUser = async (req, res, next) => {
    try {
        // Check Header
        const authHeader = req.headers.authorization
        
        if(!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({msg: "Not authorized. No token"})
        }
        // Get token
        const token = authHeader.split(" ")[1]
        
        // Verify token and get userId as payload to search in db if user exist
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        if(payload) {
            const user = await User.findById(payload.userId)
            
            if(user) {
                // Add userId to req object
                req.user = payload.userId
                return next()
            } else {
                return res.status(401).json({msg: "Not authorized. User not longer exists"})
            }
        }        
    } catch (error) {
        res.status(401).json(error)
    }
}

module.exports = authenticateUser