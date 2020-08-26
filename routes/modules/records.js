const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, category, date, merchant, amount } = req.body
  const errors = []
  if (!name || !date || !category || !amount) {
    errors.push({ message: ' * 為必填欄位 ' })
  }
  if (errors.length) {
    res.render('new', {
      errors,
      name,
      date,
      category,
      merchant,
      amount,
    })
  }
  return Record.create({ name, category, date, merchant, amount, userId })
    .then(() => res.redirect('/'))
    .catch(error => res.render('error', { error_msg: String(error) }))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => {
      res.render('edit', { record })
    })
    .catch(error => res.render('error', { error_msg: String(error) }))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => {
      record = Object.assign(record, req.body)
      record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => res.render('error', { error_msg: String(error) }))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => res.render('error', { error_msg: String(error) }))
})

module.exports = router