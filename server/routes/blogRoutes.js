const { getUserBlog, addUserBlog, deleteBlog, updateBlog } = require("../controller/blogController")

const router = require("express").Router()


router
    .get("/", getUserBlog)
    .post("/add", addUserBlog)
    .delete("/remove/:blogId", deleteBlog)
    .put("/modify/:blogId", updateBlog)



module.exports = router