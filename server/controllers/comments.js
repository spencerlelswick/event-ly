const {Comment, Event, User} = require("../models")

module.exports = {
    create,
    update,
    delete: destroy,
}

async function create(req,res){
    try {
        const userId = "64f397b1dc1e188f1c659f95" //placeholder
        const user = await User.findById(userId)

        const data = {...req.body, createdBy: userId, username: user.name}
        const newComment = await Comment.create(data)
      
        const eventId = req.params.id
        const udpateEvent = await Event.findById(eventId)
        udpateEvent.comments.push(newComment._id)
        udpateEvent.save()

        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function update(req,res){
    try {
        const commentId = req.params.idx
        data = {...req.body, edited: true}
        res.status(200).json(await Comment.findByIdAndUpdate(commentId, data, { new: true }));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function destroy(req,res){
    try {
        const commentId = req.params.idx
        res.status(200).json(await Comment.findByIdAndDelete(commentId));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}