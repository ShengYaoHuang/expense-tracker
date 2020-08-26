const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/:category', (req, res) => {
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

router.get('/:month', (req, res) => {
  const selectMonth = req.params.month
  console.log(selectMonth)
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
          const params = req.params.month
          res.render('index', { record, category, totalAmount, params })
        })
        .catch(error => console.log(error))
    })
})

module.exports = router