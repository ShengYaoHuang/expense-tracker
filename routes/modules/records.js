const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const record = req.body
  return Record.create(record)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/edit', (req, res) => {
  res.render('edit')
})



module.exports = router