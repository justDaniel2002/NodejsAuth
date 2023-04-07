const passport = require('passport')

const jwtStrategy = require('passport-jwt').Strategy

const { ExtractJwt } = require('passport-jwt')

const { jwt_secret } = require('../configs')

const User = require('../models/User')

passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: jwt_secret
}, async (payload, done)=>{
    try {
        const user = await User.findById(payload.sub)
        if(!user) return done(null,false)
        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))