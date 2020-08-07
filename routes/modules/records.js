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
  const record = req.body
  return Record.create(record)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(category => {
      return Record.findById(id)
        .lean()
        .then(record => res.render('edit', { record, category }))
        .catch(error => console.log(error))
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router