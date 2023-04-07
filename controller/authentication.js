const User = require("../models/User");

const encodeToken = require('../configs/index').encodeToken

const signIn = async (req, res, next) => {
    const user = req.user
    const token = encodeToken(user._id)
    res.setHeader('Authorization', token)
    return res.status(200).json({user})
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
    const user = req.user
    return res.status(200).json({user})
}

const authGoogle = async (req, res, next) => {
    const user = req.user
    console.log(user)
    const token = encodeToken(user._id)
    res.setHeader('Authorization', token)
    return res.status(200).json({user})
}

module.exports = {
    signIn,
    signUp,
    secret,
    authGoogle
}