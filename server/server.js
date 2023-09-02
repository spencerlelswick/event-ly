require('dotenv').config()
require('./config/db.connection.js')

const express = require('express')

const eventsRouter = require("./routes/events")

const cors = require("cors")
const morgan = require("morgan")

const { PORT } = process.env
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors()); 
app.use(morgan("dev"));

app.use("/events", eventsRouter)

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(PORT, () => {console.log(`Server started on ${PORT}`)})