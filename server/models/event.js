const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        default:"My event",
        required: true,
    },
    date: Date,
    geodata: String,
    location: String,
    address: String,
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    category: {
        type: [Number]
    },
    image: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    guests:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
},{
    timestamps: true
})

module.exports = mongoose.model("Event", eventSchema)