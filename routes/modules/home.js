const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  return Record.find({ userId })
    .lean()
    .sort({ date: "desc" })
    .then(record => {
      let totalAmount = 0
      if (record.length !== 0) {
        totalAmount = record.map(record => record.amount).reduce((a, b) => a + b)
      }
      res.render('index', { record, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router