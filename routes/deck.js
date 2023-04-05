const express = require('express');
const router = require("express-promise-router")()

const DeckController = require('../controller/deckController')

const { validateParam, validateBody, schemas} = require('../helper/routeHelpers')

// router.route('/:userID/decks')
//     .get(validateParam(schemas.idSchema),DeckController.getUserDecks)
//     .post(validateParam(schemas.idSchema),validateBody(schemas.deckSchema),DeckController.newUserDecks)

router.route('/:deckID')    
    .get(validateParam(schemas.idSchema, 'deckID'),DeckController.getDeck)
    .patch(validateParam(schemas.idSchema, 'deckID'),validateBody(schemas.deckOptionalSchema),DeckController.updateDeck)
    .put(validateParam(schemas.idSchema, 'deckID'),validateBody(schemas.deckSchema),DeckController.replaceDeck)
    .delete()

router.route('/')
    .get(DeckController.index)
    .post(validateBody(schemas.deckSchema),DeckController.newDeck)

    module.exports = router