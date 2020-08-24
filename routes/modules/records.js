const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  return Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(category => res.render('new', { category }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, category, icon, date, amount } = req.body
  return Record.create({ name, category, icon, date, amount, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(category => {
      Record.findOne({ _id, userId })
        .lean()
        .then(record => {
          res.render('edit', { record, category })
        })
    })
    .catch(error => console.log(error))
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
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router