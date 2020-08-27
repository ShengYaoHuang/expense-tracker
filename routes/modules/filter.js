const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/category/:category', (req, res) => {
  const userId = req.user._id
  return Record.find({ userId, category: `${req.params.category}` })
    .lean()
    .sort({ date: "desc" })
    .then(record => {
      console.log(record)
      let totalAmount = 0
      if (record.length !== 0) {
        totalAmount = record.map(record => record.amount).reduce((a, b) => a + b)
      }
      const params = req.params.category
      res.render('index', { record, totalAmount, params })
    })
    .catch(error => res.render('error', { error_msg: String(error) }))
})

router.get('/month/:month', (req, res) => {
  const userId = req.user._id
  return Record.find({ userId })
    .lean()
    .sort({ date: "desc" })
    .then(record => {
      const params = req.params.month
      const newRecord = []
      record.forEach(data => {
        if (data.date.includes(`${params}`)) {
          newRecord.push(data)
        }
      })
      record = newRecord
      let totalAmount = 0
      if (record.length !== 0) {
        totalAmount = record.map(record => record.amount).reduce((a, b) => a + b)
      }
      res.render('index', { record, totalAmount, params })
    })
    .catch(error => res.render('error', { error_msg: String(error) }))
})

module.exports = router