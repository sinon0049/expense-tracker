const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {
    app.use(passport.initialize())
    app.use(passport.session())
    //local login strategy
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({ email })
            .then(user => {
                if(!user) {
                    return done(null, false, { message:'That email is not registered!' })
                }
                if(password !== user.password){
                    return done(null, false, { message:'Email or password incorrect.' })
                }
                return done(null, user)
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