const mongoose = require("mongoose");

const shopitemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isInStock: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

const shopitemCollection = mongoose.model("shopitems", shopitemSchema);

module.exports = shopitemCollection;