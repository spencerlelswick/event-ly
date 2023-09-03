const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "User name"
    },
    googleId: {
        type: String,
        default: ""
    },
    avatar: {
        type: String,
        default:""
    },
    email: {
        type: String,
        default:"email@email.com"
    },
    geodata: {
        type: String,
        default:""
    },
    favCategory: {
        type: [Number],
        default: []
    },
},{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)