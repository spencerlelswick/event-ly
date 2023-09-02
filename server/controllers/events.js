const {Event} = require("../models")

module.exports = {
    index,
    // create,
    // show,
    // edit,
    // cancel,
}

async function index(req, res) {
    try {
      res.status(200).json(await Event.find());
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }