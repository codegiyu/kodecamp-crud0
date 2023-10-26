const { loginReqSchema, registerReqSchema } = require("./authSchemas");
const createUpdateProductsReqSchema = require("./shopitemSchemas");


module.exports = {
    "v1/auth/login": loginReqSchema,
    "v1/auth/register": registerReqSchema,
    "v1/shop/add-product": createUpdateProductsReqSchema,
    "v1/shop/product": createUpdateProductsReqSchema,
}