const mongoose = require('mongoose')

let productSchema = mongoose.Schema({
    image: Buffer,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    textcolor: String,
    bgcolor: String,
    panelcolor: String
})

module.exports = mongoose.model("product", productSchema)