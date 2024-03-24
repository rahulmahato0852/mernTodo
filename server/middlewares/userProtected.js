const expressAsyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")


exports.UserProtected = expressAsyncHandler(async (req, res, next) => {

    if (!req.cookies.auth) {
        return res.status(401).json({ message: "No cokkie found" })
    }

    jwt.verify(req.cookies.auth, process.env.JWT, (err, decode) => {
        if (err) {
            return res.status(401).json({ message: err })
        }

        req.body.userId = decode.id
        next()

    })


})

