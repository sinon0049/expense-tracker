const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const handlebars = require('handlebars')
const icon = require('../../models/icon')

//compareMonth helper to maintain 'select' element in index.hbs
handlebars.registerHelper('compareMonth', (current, month, options) => {
    return (current === month) ? options.fn(this) : options.inverse(this)
})

//compareCategory helper to maintain 'select' element in index.hbs
handlebars.registerHelper('compareCategory', (current, category, options) => {
    return (current === category) ? options.fn(this) : options.inverse(this)
})

//homepage
router.get('/', (req, res) => {
    let totalAmount = 0
    const userId = req.user._id
    const { category, month } = req.query
    //selection function
    return Record.find({ userId })
        .lean()
        .then(record => {
            if(month){
                record = record.filter((item) => {
                    const currentMonth = new Date(Date.parse(item.date)).getMonth() + 1
                    return currentMonth === parseInt(month, 10)
                })
            }
            if(category){
                record = record.filter((item) => item.category === category)
            }
            return record
        })
        .then(record => {
            record.forEach(record => {
                totalAmount += record.amount
            })
            res.render('index', { record, totalAmount, month, category })
        })
        .catch(error => console.log(error))
})

module.exports = router