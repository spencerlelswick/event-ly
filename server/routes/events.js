const express = require("express")
const router = express.Router()

const eventCtrl = require("../controllers/events")

router.post("/", eventCtrl.index)
router.post("/new",eventCtrl.create)
router.get("/:id", eventCtrl.show)
router.put("/:id", eventCtrl.update)
router.delete("/:id", eventCtrl.delete)

module.exports = router