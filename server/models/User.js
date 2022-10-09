const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter a name"],
        maxlength: 60,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
    },
    location: {
        type: String,
        trim: true,
        maxlength: 60,
        default: "Buenos Aires"
    },
}, {timestamps:true})


const User = mongoose.model("user", UserSchema)

module.exports = User