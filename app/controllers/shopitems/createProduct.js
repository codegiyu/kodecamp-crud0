const { shopitems } = require("../../models");
const expectedTypes = require("../../data/shopitemTypes")

async function createProduct(req, res) {
    try {
        const { name, description, price, isInStock } = req.body;

        const item = await shopitems.create({
            name,
            description,
            price,
            isInStock,
            createdBy: req.decoded
        });

        res.status(201).send({
            success: true,
            message: "Shop item created successfully",
            data: {
                item
            }
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