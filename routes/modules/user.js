const express = require('express')
const passport = require('passport')
const User = require('../../models/user')
const router = express.Router()

//login page
router.get('/login', (req, res) => {
    res.render('login')
})

//login function
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}))

//register page
router.get('/register', (req, res) => {
    res.render('register')
})

//register function
router.post('/register', (req, res) => {
    console.log(req.body)
    const{ name, email, password, confirmPassword } = req.body
    if(password !== confirmPassword) {
        console.log('密碼與確認密碼不符')
        return res.render('register', { name, email, password, confirmPassword })
    }
    User.findOne({ email })
        .then(user => {
            if(user) {
                console.log('此信箱已註冊')
                return res.render('register', { name, email, password, confirmPassword })
            } else {
                User.create({ name, email, password })
                    .then(() => res.redirect('/'))
            }
        })
        .catch(err => console.log(err))
})

module.exports = router
