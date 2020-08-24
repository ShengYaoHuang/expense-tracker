const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')
const PORT = process.env.PORT || 3000
const app = express()
const Handlebars = require('handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: 'handlebars' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'ThisIsExpenseTrackerSecret',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

Handlebars.registerHelper('ifEqual', function (category1, category2, options) {
  if (category1 === category2) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

usePassport(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log('App is running on http://localhost:3000')
})