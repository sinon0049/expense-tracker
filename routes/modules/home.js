const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const icon = require('../../models/icon')

//homepage
router.get('/', (req, res) => {
    let totalAmount = 0
    Record.find()
    .lean()
    .then(record => {
        record.forEach(record => totalAmount += record.amount)
        res.render('index', { record, totalAmount })
    })
    .catch(error => console.log(error))
})

//filter function
router.get('/filter/:category', (req, res) => {
    let isCategory = {
        household : false,
        traffic : false,
        entertainment : false,
        food : false,
        others : false
    }
    let totalAmount = 0
    const category = req.params.category
    //dropdown select in index.hbs
    switch(category) {
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
    Record.find({ category: category })
    .lean()
    .then(record => {
        record.forEach(record => totalAmount += record.amount)
        res.render('index', { record, totalAmount, isCategory })
    })
    .catch(error => console.log(error))
})

module.exports = router