const multer = require("multer")
const path = require("path")
const { v4 } = require("uuid")


const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const fn = path.extname(file.originalname)
        const name = v4() + fn
        cb(null, name)
    },
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
})


module.exports = multer({ storage }).single("hero")



