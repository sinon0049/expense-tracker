const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const handlebars = require('handlebars')

//compareCategory helper to maintain 'select' element in index.hbs
handlebars.registerHelper('compareCategory', (current, category, options) => {
    return (current === category) ? options.fn(this) : options.inverse(this)
})

//create page
router.get('/new', (req, res) => {
    res.render('new')
})

//create function
router.post('/', (req, res) => {
    const { name, date, category, amount, merchant } = req.body
    const userId = req.user._id
    Record.create({ name, date, category, amount, merchant, userId })
        .then(res.redirect('/'))
        .catch(error => console.log(error))
    
})

//edit page
router.get('/:id/edit', (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    Record.findOne({ _id, userId })
    .lean()
    .then(record => {
        const category = record.category
        res.render('edit', { record, category })
    })
    .catch(error => console.log(error))
})

//edit function
router.put('/:id', (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    Record.findOne({ _id, userId })
    .then(record => {
        record.name = req.body.name
        record.category = req.body.category
        record.date = req.body.date
        record.amount = req.body.amount
        record.merchant = req.body.merchant
        return record.save()
    })
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

//delete function
router.delete('/:id', (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router