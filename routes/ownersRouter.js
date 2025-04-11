const express = require('express')
const router = express.Router()
const ownerModel = require('../models/owner-model')

router.get("/", (req, res) => {
    res.send("hello from owner");
})
if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        try {
            let { email, fullname, password } = req.body
            let Ouser = await ownerModel.findOne({ email })
            if (Ouser) return res.status(401).send("You Can't create Owner! please Login")
            let createduser = await ownerModel.create({
                fullname,
                email,
                password
            })
            res.send(createduser)
        }
        catch (err) {
            res.send(err.message)
        }
    })

}
router.get("/admin", (req, res) => {
    let success = req.flash("success")
    res.render("createproducts", { success })
})

module.exports = router