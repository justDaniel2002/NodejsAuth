const express = require('express');
const router = require("express-promise-router")()
const userRoute = require('./user')
const deckRoute = require('./deck')
const authentication = require('../controller/authentication')
const { validateParam, validateBody, schemas} = require('../helper/routeHelpers')

router.post('/signup',validateBody(schemas.authSignUpSchema), authentication.signUp)

router.post('/signin',validateBody(schemas.authSignInSchema),authentication.signIn)

router.route('/secret',authentication.secret)
    .get()

router.use('/users',userRoute);

router.use('/decks',deckRoute);

module.exports = router