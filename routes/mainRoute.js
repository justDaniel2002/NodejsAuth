const express = require('express');
const router = require("express-promise-router")()
const userRoute = require('./user')
const deckRoute = require('./deck')
const authentication = require('../controller/authentication')
const { validateParam, validateBody, schemas} = require('../helper/routeHelpers')

const passport = require('passport')

router.route('/auth/google').post(passport.authenticate('google-token',{session: false}),authentication.authGoogle)

router.post('/signup',validateBody(schemas.authSignUpSchema), authentication.signUp)

router.post('/signin',validateBody(schemas.authSignInSchema),passport.authenticate('local',{ session: false}),authentication.signIn)

router.route('/secret')
    .get(passport.authenticate('jwt',{ session: false}),authentication.secret)

router.use('/users',userRoute);

router.use('/decks',deckRoute);

module.exports = router