const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        default:"Text placeholder",
    },
    username: {
        type: String,
        default:"username",
    },
    edited:{
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Comment", commentSchema)