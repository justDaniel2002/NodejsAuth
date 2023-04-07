const passport = require('passport')

const jwtStrategy = require('passport-jwt').Strategy

const LocalStrategy = require('passport-local').Strategy

const { ExtractJwt } = require('passport-jwt')

const { jwt_secret } = require('../configs')

const User = require('../models/User')

passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: jwt_secret
}, async (payload, done)=>{
    await User.findById(payload.sub)
            .then((user) => done(null, user))
            .catch((error) => done(error, false))
}))

//passport local
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done)=>{ 
    await User.findOne({'email': email})
            .then( async (user) =>{
                if(await user.isValidPassword(password)){
                    return done(null, user)
                }
                else done(new Error('false password'), false)
            })
            .catch((error) => done(error, false))
}))