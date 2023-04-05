const Joi = require('joi')
const { schema } = require('../models/User')

const validateParam = (schemas, paramName) => {
    return (req, res, next) => {
        const validatorResult = schemas.validate({param: req.params[paramName]})

        if(validatorResult.error){
            return res.status(400).json(validatorResult.error)
        }else{
            next()
        }
    }
}

const validateBody = (schemas) => {
    return (req, res, next) => {
        const validatorResult = schemas.validate(req.body)

        if(validatorResult.error){
            return res.status(400).json(validatorResult.error)
        }else{
            next()
        }
    }
}

const schemas = {
    idSchema:Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),

    authSignUpSchema: Joi.object().keys({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }),

    authSignInSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }),

    userSchema: Joi.object().keys({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().email().required()
    }),
    userOptionalSchema: Joi.object().keys({
        firstName: Joi.string().min(2),
        lastName: Joi.string().min(2),
        email: Joi.string().email()
    }),
    deckSchema: Joi.object().keys({
        name: Joi.string().min(6).required(),
        description: Joi.string().min(10).required(),
        owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
    deckOptionalSchema: Joi.object().keys({
        name: Joi.string().min(6),
        description: Joi.string().min(10),}),
        owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
}

module.exports ={
    validateParam,
    validateBody,
    schemas, 
}