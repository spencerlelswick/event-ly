const mongoose = require('mongoose')
const { DATABASE_URI } = process.env

mongoose.set("strictQuery", true)
mongoose.connect(DATABASE_URI)

mongoose.connection
  .on('open', () => console.log(`Connection successful to evently-db`))
  .on('close', () => console.log(`evently-db closed connection`))
  .on('error', error => console.log(error))