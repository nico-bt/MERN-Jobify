const validator = require('validator');
const User = require('../models/user');


const register = async (req, res) => {
    const {name, email, password, location} = req.body
    
    if(!name || !email || !password) {
        return res.status(400).json({msg: "Please enter all fields"})
    }
    
    if (!validator.isEmail(email)) {
        return res.status(400).json({msg: "Please enter a valid email"})
    }

    try {
        const newUser = await User.create({name, email, password, location})
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)

    }
}

const login = (req, res) => {
    res.send("Login user")
}

const updateUser = (req, res) => {
    res.send("Update user")
}

module.exports = {register, login, updateUser}