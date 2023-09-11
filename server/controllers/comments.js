const {Comment, Event, User} = require("../models")

module.exports = {
    create,
    update,
    delete: destroy,
}

async function create(req,res){
    try {
        const newComment = await Comment.create(req.body)
        newComment.populate("createdBy")
        const eventId = req.params.eId
        const updatedEvent = await Event.findById(eventId)
        .populate("guests")
        .populate("createdBy")
        .populate("comments")
        .populate({
            path: "comments",
            populate: "createdBy"
        })
        updatedEvent.comments.push(newComment)
        updatedEvent.save()
        res.status(201).json(updatedEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function update(req,res){
    try {
        const commentId = req.params.cId
        data = {...req.body, edited: true}
        res.status(200).json(await Comment.findByIdAndUpdate(commentId, data, { new: true }));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function destroy(req,res){
    try {
        const commentId = req.params.cId
        await Comment.findByIdAndDelete(commentId)
        const eventId = req.params.eId
        const updatedEvent = await Event.findById(eventId)
        .populate("guests")
        .populate("createdBy")
        .populate("comments")
        .populate({
            path: "comments",
            populate: "createdBy"
        })
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}