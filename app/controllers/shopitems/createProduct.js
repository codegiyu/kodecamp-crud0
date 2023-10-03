const { shopitems } = require("../../models");
const expectedTypes = require("../../data/shopitemTypes")

async function createProduct(req, res) {
    try {
        const { name, description, price, isInStock } = req.body;

        if (!name || !description || price == undefined || isInStock == undefined) {
            const errorObj = {};
            const body = { name, description, price, isInStock }

            for (let key in body) {
                if (body[key] == undefined || body[key] === "") {
                    errorObj[key] = `${key} must be available in request`
                }
            }

            return res.status(400).send({
                success: false,
                error: errorObj,
                message: "Shop item creation failed due to missing fields"
            })
        }

        if (typeof name !== "string" || typeof description !== "string" || typeof price !== "number" || typeof isInStock !== "boolean") {
            const errorObj = {};
            const body = { name, description, price, isInStock }

            for (let key in body) {
                if (typeof body[key] !== expectedTypes[key]) {
                    errorObj[key] = `${key} should be ${expectedTypes[key]}`
                }
            }

            return res.status(400).send({
                success: false,
                error: errorObj,
                message: "Shop item creation failed due to datatype mismatch"
            })
        }

        await shopitems.create({
            name,
            description,
            price,
            isInStock,
            createdBy: req.decoded
        });

        res.status(201).send({
            success: true,
            message: "Shop item created successfully"
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            error: err.message,
            message: "Shop item creation failed unexpectedly"
        })
    }
}

module.exports = createProduct;