const {Event} = require("../models")

module.exports = {
    index,
    create,
    show,
    update,
    delete: destroy,
}

async function index(req, res) {
    const lat = req.body.coordinates[0]
    const lng = req.body.coordinates[1]
    const delta = 0.2
    try {
      res.status(200).json(await Event.find({
        "coordinates.latitude": {$gte: lat-delta, $lt: lat+delta},
        "coordinates.longitude": {$gte: lng-delta, $lt: lng+delta},
    }));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

async function create(req, res) {
    const lat = req.body.coordinates[0]
    const lng = req.body.coordinates[1]
    try {
        const userId = "64f397b1dc1e188f1c659f95" //placeholder
        const data = {
            ...req.body,
            createdBy: userId,
            coordinates: {latitude: lat, longitude: lng}
        }
        res.status(201).json(await Event.create(data));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function show(req,res){
    try {
        const foundEvent = await Event.findById(req.params.id)
        .populate("guests")
        .populate("createdBy")
        .populate("comments")
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
        .populate("comments")
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


