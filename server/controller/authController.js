const asyncHandler = require("express-async-handler")
const validator = require("validator")
const Auth = require("../model/Auth")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


exports.registerUser = asyncHandler(async (req, res) => {

    if (!req.body.name) {
        return res.status(400).json({ message: "Name not found" })
    }
    if (!validator.isEmail(req.body.email)) {
        return res.status(400).json({ message: "Email invalid" })
    }
    if (!validator.isStrongPassword(req.body.password)) {
        return res.status(400).json({ message: "PLZ enter  Strong  poassword" })
    }




    const { email, name, password } = req.body
    const result = await Auth.findOne({ email })
    console.log(result);
    if (result) {
        return res.status(400).json({ message: "Email Already exits" })
    }

    const hashPass = await bcrypt.hash(password, 10)
    await Auth.create({ ...req.body, password: hashPass, role: "user" })
    res.status(201).json({ message: "Register success" })
})




exports.LogInUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email" })
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "Invalid password" })
    }

    const result = await Auth.findOne({ email })

    if (!result) {
        return res.status(400).json({ message: "Email not found plz login" })
    }

    const comparePass = await bcrypt.compare(password, result.password)

    if (!comparePass) {
        return res.status(400).json({ message: "Wrong Password" })
    }

    const token = jwt.sign({ id: result._id }, process.env.JWT, { expiresIn: 36000 * 60 })

    res.cookie("auth", token)

    res.status(200).json({ message: "Log In success", result: { name: result.name, email: result.email, role: result.role } })

})


exports.logOut = asyncHandler(async (req, res) => {
    res.clearCookie("auth")
    res.status(200).json({ message: "Log Out Success" })
})




