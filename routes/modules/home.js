const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  Category.find()
    .lean()
    .then(category => {
      return Record.find()
        .lean()
        .sort({ date: "desc" })
        .then(record => {
          let totalAmount = 0
          if (record.length !== 0) {
            totalAmount = record.map(record => record.amount).reduce((a, b) => a + b)
          }
          res.render('index', { record, category, totalAmount })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

router.get('/filter/:category', (req, res) => {
  Category.find()
    .lean()
    .then(category => {
      return Record.find({ category: `${req.params.category}` })
        .lean()
        .sort({ date: "desc" })
        .then(record => {
          let totalAmount = 0
          if (record.length !== 0) {
            totalAmount = record.map(record => record.amount).reduce((a, b) => a + b)
          }
          const params = req.params.category
          res.render('index', { record, category, totalAmount, params })
        })
        .catch(error => console.log(error))
    })
})

module.exports = router