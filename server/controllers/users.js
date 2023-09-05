const {User} = require("../models")

module.exports = {
    index,
    create,
    show,
    update
}

async function index(req, res) {
    try {
      res.status(200).json(await User.find());
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

async function create(req,res){
    try {
        res.status(201).json(await User.create(req.body));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function show(req,res){
    try {
        res.status(200).json(await User.findById(req.params.id));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function update(req,res){
    try {
        res.status(200).json(await User.findByIdAndUpdate(req.params.id, req.body, { new: true }));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


