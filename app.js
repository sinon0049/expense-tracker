const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const exphb = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
require('./config/mongoose')

app.engine('hbs', exphb({ defaultLayout:'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(session({
    secret: 'Secret',
    resave: false,
    saveUninitialized: true
}))
usePassport(app)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, (req, res) => {
    console.log(`Expense tracker is listening on http://localhost:${port}`)
})