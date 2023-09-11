const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        default:"My event",
        required: true,
    },
    date: Date,
    coordinates: {
        latitude:{
        type: Number,
        default: 38.21363852151677
        },
        longitude:{
        type: Number,
        default: -85.58345588638122
        }
    },
    location:  {
        type: String,
        required: true,
        default:"Location name"
    },
    address: {
        type: String,
        required: true,
        default:""
    },
    description: {
        type: String,
        required: true,
        default:"Event description"
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    category: {
        type: Number,
        min: 1,
        max: 12,
        

    },
    image: {
        type: String,
        required: true,
        default:"https://picsum.photos/400/200"
    },
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
