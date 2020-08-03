const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://localhost:expense_tracker')

app.get('/', (req, res) => {
  res.send('hello')
})



app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})