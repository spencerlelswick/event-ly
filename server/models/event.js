const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default:"My event"
    },
    date: Date,
    geodata: String,
    location: String,
    address: String,
    status: {
        tpe: Boolean,
        default: true
    },
    category: [Number],
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
},
{
    timestamps: true
})

module.export = mongoose.model("Event", eventSchema)