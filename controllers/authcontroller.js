const userModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const { gen } = require('../Utils/gen')
require('dotenv').config()

module.exports.registerUser = async (req, res) => {
    try {
        let { fullname, email, password } = req.body
        let user = await userModel.findOne({ email })

        if (user) {
            req.flash("error", "Email is Exist Please Login!")
            return res.redirect("/")
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message)
                let user = await userModel.create({
                    fullname,
                    email,
                    password: hash
                })
                let token = gen(user)
                res.cookie('token', token)
                res.redirect("/shop")
            })
        })

    }
    catch (err) {
        console.log(err.message)
    }
}

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body

    let user = await userModel.findOne({ email })

    if (!user) {
        req.flash("error", "Email or Password is wrong")
        return res.redirect("/")
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = gen(user)
            res.cookie("token", token)
            res.redirect("/shop")
        }
        else {
            req.flash("error", "Email or Password is wrong")
            return res.redirect("/")
        }

    })
}

module.exports.logout = (req, res) => {
    res.cookie("token", "")
    res.redirect("/")
}