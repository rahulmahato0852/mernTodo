const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
const cokkieParser = require("cookie-parser")
const { UserProtected } = require("./middlewares/userProtected")
require("dotenv").config({ path: "./.env" })




mongoose.connect(process.env.MONGO)


const app = express()

app.use(express.static(path.join(__dirname, "dist")))
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
app.use(cokkieParser())
app.use(express.static("uploads"))


app.use("/api/v1/auth", require("./routes/AuthRoutes"))
app.use("/api/v1/user", UserProtected, require("./routes/blogRoutes"))

app.use("*", (req, res) => {
    res.sendFile(__dirname, "dist", "index.html")
    // res.status(404).json({ message: "Resource not found" })
})


app.use((err, req, res, next) => {
    res.status(400).json({ message: err.message })
})


mongoose.connection.once("open", () => {
    console.log("Mongoose connected");
    app.listen(process.env.PORT, console.log("SERVER RUNNING"))
})



