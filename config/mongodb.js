const mongoose = require('mongoose')
require('dotenv').config()

mongoose
    .connect(`${process.env.Ajaz}/Scatch`)
    .then(function () {
        console.log("connected");
    })
    .catch(function (err) {
        console.log(err.message);
    })

module.exports = mongoose.connection    