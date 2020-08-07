const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const categoryList = []

  Record.find()
    .lean()
    .sort({ date: "desc" })
    .then(records => {
      let totalAmount = 0
      if (records.length !== 0) {
        totalAmount = records.map(record => record.amount).reduce((a, b) => a + b)
      }
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router