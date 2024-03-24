const { registerUser, LogInUser, logOut } = require("../controller/authController")

const router = require("express").Router()



router
    .post("/register", registerUser)
    .post("/login", LogInUser)
    .post("/logOut", logOut)












module.exports = router














