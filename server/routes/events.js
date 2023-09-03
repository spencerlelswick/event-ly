const express = require("express")
const router = express.Router()

const eventCtrl = require("../controllers/events")

router.get("/", eventCtrl.index)
router.post("/",eventCtrl.create)
router.get("/:id", eventCtrl.show)
router.put("/:id", eventCtrl.update)
router.delete("/:id", eventCtrl.delete)

module.exports = router