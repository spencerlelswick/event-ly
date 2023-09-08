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
        if (req.body.filterBy === "coord"){
            const lat = req.body.coordinates[0]
            const lng = req.body.coordinates[1]
            const delta = 0.2
            
            res.status(200).json(await Event.find({
                "coordinates.latitude": {$gte: lat-delta, $lt: lat+delta},
                "coordinates.longitude": {$gte: lng-delta, $lt: lng+delta},
            }));
        }else if (req.body.filterBy === "user"){
            const userId = req.body.userId
            const events = await Event.find({$or:[{"createdBy": userId},{"guests": userId}]})
            res.status(200).json(events)
        }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

async function create(req, res) {
    const lat = req.body.coordinates[0]
    const lng = req.body.coordinates[1]
    try {
        const data = {
            ...req.body,
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
        .populate({
            path: "comments",
            populate: "createdBy"
        })
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
        .populate({
            path: "comments",
            populate: "createdBy"
        })
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


