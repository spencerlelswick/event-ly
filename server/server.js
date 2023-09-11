require('dotenv').config()
require('./config/db.connection.js')

const express = require('express')

const eventsRouter = require("./routes/events")
const usersRouter = require("./routes/users")
const commentsRouter = require("./routes/comments")

const cors = require("cors")
const morgan = require("morgan")

const { PORT } = process.env
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors()); 
app.use(morgan("dev"));

app.use("/", commentsRouter)
app.use("/events", eventsRouter)
app.use("/users", usersRouter)

app.get('/', (req, res) => {
  res.send('hello world, server up!')
})

app.listen(PORT, () => {console.log(`Server started on PORT: ${PORT}`)})