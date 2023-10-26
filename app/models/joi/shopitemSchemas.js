const Joi = require("joi");

const createUpdateProductsReqSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    isInStock: Joi.boolean().required()
})

module.exports = createUpdateProductsReqSchema;