require('dotenv').config()
require('./config/db.connection.js')


const { PORT } = process.env
const express = require('express')
const cors = require("cors")
const morgan = require("morgan")
const app = express()

app.use(cors()); 
app.use(morgan("dev"));

app.get('/', (req, res) => {
  res.send('hello world')
})


app.listen(PORT, () => {console.log(`Server started on ${PORT}`)})