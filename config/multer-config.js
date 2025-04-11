const multer = require('multer')

const Stroage = multer.memoryStorage()
const upload = multer({ Stroage: Stroage })

module.exports = upload