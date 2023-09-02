const express = require("express")
const router = express.Router()

const eventCtrl = require("../controllers/events")

router.get("/", eventCtrl.index)

module.exports = router