const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const icon = require('../../models/icon')

//create page and function
router.get('/new', (req, res) => {
    res.render('new')
})

router.post('/', (req, res) => {
    const newRecord = Object.assign(req.body)
    newRecord.icon = icon[newRecord.category]
    Record.create(newRecord)
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

//edit page and function
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    let isCategory = {
        household : false,
        traffic : false,
        entertainment : false,
        food : false,
        others : false
    }
    Record.findById(id)
    .lean()
    .then(record => {
        //dropdown select in edit.hbs
        switch(record.category) {
            case 'household':
                isCategory.household = true
                break
            case 'traffic':
                isCategory.traffic = true
                break
            case 'entertainment':
                isCategory.entertainment = true
                break
            case 'food':
                isCategory.food = true
                break
            case 'others':
                isCategory.others = true
                break
        }
        res.render('edit', { record, isCategory })
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    Record.findById(id)
    .then(record => {
        record.name = req.body.name
        record.category = req.body.category
        record.date = req.body.date
        record.amount = req.body.amount
        record.icon = icon[req.body.category]
        return record.save()
    })
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

//delete function
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Record.findById(id)
    .then(record => record.remove())
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router