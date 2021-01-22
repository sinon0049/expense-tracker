const Record = require('../record')
const User = require('../user')
const recordList = require('./record.json')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

const seedUser = {
    email: 'user1@example.com',
    password: '12345678'
}

db.once('open', () => {
    /*recordList.results.forEach(record => {
        Record.create(record)
    })
    console.log('seeds create success')*/
    bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash => User.create({ email: seedUser.email, password: hash}))
        .then(user => {
            const userId = user._id
            return Promise.all((Array.from(
                { length: 5 },
                (_, i) => Record.create({ ...recordList.results[i], userId })
            )))
        })
        .then(() => {
            console.log('done')
            process.exit()
        })
        .catch(err => console.log(err))
})