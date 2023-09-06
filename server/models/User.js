const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "User name"
    },
    avatar: {
        type: String,
        required: true,
        default:"https://placekitten.com/100/100"
    },
    email: {
        type: String,
        required: true,
        default:"email@email.com"
    },
    geodata: {
        type: String,
        default:""
    },
    favCategory: {
        type: [Number],
        required: true,
        default: []
    },
},{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)