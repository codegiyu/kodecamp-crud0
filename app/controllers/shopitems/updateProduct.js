const { shopitems } = require("../../models");
const expectedTypes = require("../../data/shopitemTypes");

async function updateProduct(req, res) {
    try {
        const { name, description, price, isInStock } = req.body;
        const { id } = req.params;
        console.log(req.path);

        if (!id) {
            return res.status(400).send({
                success: false,
                error: "No item id in request",
            })
        }

        const data = await shopitems.updateOne({ _id: id }, { $set: { name, description, price, isInStock, modifiedBy: req.decoded } });

        if (!data.modifiedCount) {
            return res.status(404).send({
                success: false,
                error: "No shop item found with that id"
            })
        }

        res.status(200).send({
            success: true,
            message: "Shop item updated successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            error: err.message,
            message: "Shop item update failed unexpectedly"
        })
    }
}

module.exports = updateProduct;