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
    const { currentCategory, currentMonth } = req.query
    //filter function
    //if category is selected
    if(currentCategory){
        return Record.find({ userId, category: currentCategory })
            .lean()
            .then(record => {
                if(currentMonth){
                    return record.filter((item) => {
                        const month = new Date(Date.parse(item.date)).getMonth() + 1
                        return month === parseInt(currentMonth, 10)
                    })
                }
                return record
            })
            .then(record => {
                record.forEach(record => {
                    totalAmount += record.amount
                })
                res.render('index', { record, totalAmount, currentMonth, currentCategory })
            })
            .catch(error => console.log(error))
    }
    //else
    return Record.find({ userId })
        .lean()
        .then(record => {
            if(currentMonth){
                return record.filter((item) => {
                    const month = new Date(Date.parse(item.date)).getMonth() + 1
                    return month === parseInt(currentMonth, 10)
                })
            }
            return record
        })
        .then(record => {
            record.forEach(record => {
                totalAmount += record.amount
            })
            res.render('index', { record, totalAmount, currentMonth, currentCategory })
        })
        .catch(error => console.log(error))
})

module.exports = router