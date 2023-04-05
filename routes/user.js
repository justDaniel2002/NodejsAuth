const express = require('express');
const router = require("express-promise-router")()

const UserController = require('../controller/userController')

const { validateParam, validateBody, schemas} = require('../helper/routeHelpers')

router.route('/:userID/decks')
    .get(validateParam(schemas.idSchema, 'userID'),UserController.getUserDecks)
    .post(validateParam(schemas.idSchema, 'userID'),validateBody(schemas.deckSchema),UserController.newUserDecks)

router.route('/:userID')    
    .get(validateParam(schemas.idSchema, 'userID'),UserController.getUser)
    .patch(validateParam(schemas.idSchema, 'userID'),validateBody(schemas.userOptionalSchema),UserController.updateUser)
    .put(validateParam(schemas.idSchema, 'userID'),validateBody(schemas.userSchema),UserController.replaceUser)
    .delete()

router.route('/')
    .get(UserController.index)
    .post(validateBody(schemas.userSchema),UserController.newUser)

    module.exports = router