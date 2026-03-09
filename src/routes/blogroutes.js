const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const auth = require("../MIddleware/auth");

/* Create Blog */
router.post("/", auth, async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
});

/* View Blogs */
router.get("/", auth , async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

/* Update Blog */
router.put("/:id", auth, async (req, res) => {
  await Blog.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Blog Updated" });
});

/* Delete Blog */
router.delete("/:id", auth, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog Deleted" });
});

module.exports = router;