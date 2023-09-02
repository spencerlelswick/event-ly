const {Event} = require("../models")

module.exports = {
    index,
    create,
    show,
    update,
    delete: destroy,
}

async function index(req, res) {
    try {
      res.status(200).json(await Event.find());
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

async function create(req,res){
    try {
        res.status(201).json(await Event.create(req.body));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function show(req,res){
    try {
        const foundEvent = await Event.findById(req.params.id)
        .populate("guests")
        .populate("createdBy")
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function update(req,res){
    try {
        const foundEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .populate("guests")
        .populate("createdBy")
        res.status(200).json(foundEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function destroy(req,res){
    try {
        res.status(200).json(await Event.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

