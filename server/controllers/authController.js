const validator = require('validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

// Register a new user
//********************************************************************************/
const register = async (req, res, next) => {
    const {name, email, password, location} = req.body
    
    if(!name || !email || !password) {
        return res.status(400).json({msg: "Please enter all fields"})
    }
    
    if (!validator.isEmail(email)) {
        return res.status(400).json({msg: "Please enter a valid email"})
    }
    
    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        // Create user in db
        let newUser = await User.create({name, email, password: hashedPassword, location})
        
        //Token
        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
        
        // To not include password in response
        newUser.password = undefined  
        
        res.status(201).json({ token, user: newUser })
    } catch (error) {
        // Errors coming from Db Schema are passed to the error-handler middleware (eg-> email: unique)
        next(error)
    }
}


// Login existing user
//********************************************************************************/
const login = async (req, res) => {
    const {email, password} = req.body

    // Check for empty/valid inputs
    if(!email || !password) {
        return res.status(400).json({msg: "Please enter all fields"})
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({msg: "Please enter a valid email"})
    }

    // Check if user exists in db
    const userInDb = await User.findOne({email})
    
    if(!userInDb) {
        return res.status(401).json({msg: "Email not registered. Register first please"})
    } else {
        // Check if password matches with hashed password in db
        const passwordMatch = await bcrypt.compare(password, userInDb.password )
        if (!passwordMatch) {
            return res.status(401).json({msg: "Incorrect Credentials"})
        }
        
        // User ok and password ok --> Generate Token and return it
        const token = jwt.sign({userId: userInDb._id}, process.env.JWT_SECRET, {expiresIn: "1d"})        
        userInDb.password = undefined
        
        res.status(200).json({ token, user: userInDb })    
    }
}


// Update an user
//********************************************************************************/
const updateUser = (req, res) => {
    res.send("Update user")
}


module.exports = {register, login, updateUser}