const {Event} = require("../models")

module.export = {
    index
    // create,
    // show,
    // edit,
    // cancel,
}

async function index(req,res) {
    try{
        res.status(200).json(await Event.find({}))
    } catch(error){
        console.log("error")
    }
}


