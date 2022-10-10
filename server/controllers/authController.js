const validator = require('validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

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
        const newUser = await User.create({name, email, password: hashedPassword, location})
        
        newUser.password = undefined  // To not include password in response
        res.status(201).json(newUser)
    } catch (error) {
        // Errors coming from Db Schema are passed to the error-handler middleware (eg-> email: unique)
        next(error)
    }
}


// Login existing user
//********************************************************************************/
const login = (req, res) => {
    res.send("Login user")
}


// Update an user
//********************************************************************************/
const updateUser = (req, res) => {
    res.send("Update user")
}


module.exports = {register, login, updateUser}