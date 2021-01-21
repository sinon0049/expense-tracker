if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const exphb = require('express-handlebars')
const app = express()
const port = process.env.PORT
const routes = require('./routes')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
require('./config/mongoose')

app.engine('hbs', exphb({ defaultLayout:'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')
    res.locals.warning_msg = req.flash('warning_msg')
    next()
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, (req, res) => {
    console.log(`Expense tracker is listening on http://localhost:${port}`)
})