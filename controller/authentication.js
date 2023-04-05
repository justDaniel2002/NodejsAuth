const User = require("../models/User");

const encodeToken = require('../configs/index').encodeToken

const signIn = async (req, res, next) => {
    const newUser = new User(req.body)
    await newUser.save()
        .then((user) => res.status(200).json({user}))
}

const signUp = async (req, res, next) => {
    const newUser = new User(req.body)
    const token = encodeToken(newUser._id)
    res.setHeader('Authorization', token)
    await newUser.save()
        .then((user) => {
            return res.status(200).json({user})
        })
}

const secret = async (req, res, next) => {

}

module.exports = {
    signIn,
    signUp,
    secret
}