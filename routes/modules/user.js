const express = require('express')
const passport = require('passport')
const User = require('../../models/user')
const router = express.Router()
const bcrypt = require('bcryptjs')

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
    const{ name, email, password, confirmPassword } = req.body
    const errors = []
    if(password !== confirmPassword) {
        errors.push({ message: '密碼和確認密碼不符!' })
    }
    User.findOne({ email })
        .then(user => {
            if(user) {
                errors.push({ message: '此信箱已註冊!' })
            } 
            if(errors.length) {
                return res.render('register', { name, email, password, confirmPassword, errors })
            }
            else {
                return bcrypt.genSalt(10)
                .then(salt => bcrypt.hash(password, salt))
                .then(hash => {
                    User.create({ name, email, password: hash})
                    req.flash('success_msg', '您已成功註冊。')
                    res.redirect('/users/login')
                })
            }
        })
        .catch(err => console.log(err))
})

//logout function
router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', '您已成功登出。')
    res.redirect('/users/login')
})

module.exports = router
