const express = require('express')
const router = express.Router()
const upload = require('../config/multer-config')
const productModel = require('../models/product-model')

router.get("/", (req, res) => {
    res.send("hello from product");
})

router.post("/create", upload.single("image"), async (req, res) => {
    try {
        let { name, price, discount, bgcolor, textcolor, panelcolor } = req.body
        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            textcolor,
            panelcolor
        });
        req.flash("success", "Product Created Successfully")
        res.redirect("/owners/admin")
    }
    catch (err) {
        res.send(err.message)
    }
})

module.exports = router