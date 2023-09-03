const express = require("express")
const router = express.Router()

const userCtrl = require("../controllers/users")

router.get("/", userCtrl.index)
router.post("/",userCtrl.create)
router.get("/:id", userCtrl.show)
router.put("/:id", userCtrl.update)

module.exports = router