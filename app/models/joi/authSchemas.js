const Joi = require("joi");

const loginReqSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
})

const registerReqSchema = Joi.object({
    fullName: Joi.string().required(),
    userName: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().min(6).max(25).required(),
    role: Joi.string().allow("user", "admin").required()
})

const authSchemas = {
    loginReqSchema,
    registerReqSchema
}

module.exports = authSchemas;