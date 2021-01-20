const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {
    app.use(passport.initialize())
    app.use(passport.session())
    //local login strategy
    passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
        User.findOne({ email })
            .then(user => {
                if(!user) {
                    return done(null, false, req.flash('warning_msg', '該信箱尚未註冊!'))
                }
                return bcrypt.compare(password, user.password).then(isMatch => {
                    if(!isMatch) return done(null, false, req.flash('warning_msg', '信箱或密碼錯誤!'))
                    return done(null, user, req.flash('success_msg', '您已成功登入。'))
                })
            })
            .catch(err => console.log(err))
    }))
    //serialize
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    //deserialize
    passport.deserializeUser((id, done) => {
        User.findById(id)
            .lean()
            .then(user => done(null, user))
            .catch(err => done(err, null))
    })
}