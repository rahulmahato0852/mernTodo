const expressAsyncHandler = require("express-async-handler");
const Blog = require("../model/Blog");
const imageUpload = require("../utils/imageUpload");
const jwt = require("jsonwebtoken")
const fs = require("fs/promises")
const path = require("path")


exports.getUserBlog = expressAsyncHandler(async (req, res) => {

    console.log(req.body);

    const result = await Blog.find({ userId: req.body.userId })

    res.status(200).json({ message: "User Blog Feth Success", result })
})


exports.addUserBlog = expressAsyncHandler(async (req, res) => {


    imageUpload(req, res, async (err) => {
        if (err) {
            return req.status(400).json({ message: err })
        }
        const url = req.file.filename


        jwt.verify(req.cookies.auth, process.env.JWT, async (err, decode) => {
            if (err) {
                return res.status(401).json({ message: err })
            }

            req.body.userId = decode.id

            const result = await Blog.create({ ...req.body, hero: url })
            res.status(200).json({ message: "User Blog add Success" })
        })

    })



})


exports.deleteBlog = expressAsyncHandler(async (req, res) => {
    const { blogId } = req.params
    const result = await Blog.findById(blogId)
    await fs.unlink(path.join(__dirname, "..", "uploads", result.hero))
    await Blog.findByIdAndDelete(blogId)
    res.status(200).json({ message: "User Blog delete Success" })
})



exports.updateBlog = expressAsyncHandler(async (req, res) => {
    const { blogId } = req.params
    const { title, desc } = req.body
    console.log(title, desc)
    if (title || desc) {
        await Blog.findByIdAndUpdate(blogId, req.body)
        return res.status(200).json({ message: "User Blog Update Success" })
    } else {

        console.log(req.body);
        imageUpload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err.message || "error in img uploading" })
            }
            const result = await Blog.findById(blogId)
            await fs.unlink(path.join(__dirname, "..", "uploads", result.hero))
            await Blog.findByIdAndUpdate(blogId, { ...req.body, hero: req.file.filename })
            res.status(200).json({ message: "User Blog Update Success" })

        })

    }

})