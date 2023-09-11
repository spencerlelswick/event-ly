const express = require("express")
const router = express.Router()

const commentCtrl = require("../controllers/comments")

router.post("/events/:eId/comments",commentCtrl.create)
router.put("/events/:eId/comments/:cId", commentCtrl.update)
router.delete("/events/:eId/comments/:cId", commentCtrl.delete)

module.exports = router