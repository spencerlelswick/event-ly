const express = require("express")
const router = express.Router()

const commentCtrl = require("../controllers/comments")

router.post("/events/:id/comments",commentCtrl.create)
router.put("/events/:id/comments/:idx", commentCtrl.update)
router.delete("/events/:id/comments/:idx", commentCtrl.delete)

module.exports = router