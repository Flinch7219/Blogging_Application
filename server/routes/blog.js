const express = require('express')
const blogrouter = express.Router() 
const blogController = require("../controllers/blog")
const { authenticate } = require('../middlewares/authMiddleware')

blogrouter.get('/', authenticate, blogController.getAllBlogs)
blogrouter.get('/:id', authenticate, blogController.getBlogById)
blogrouter.post('/', authenticate, blogController.createBlog)
blogrouter.patch('/:id', authenticate, blogController.updateBlog)
blogrouter.delete('/:id', authenticate, blogController.deleteBlog)

module.exports = blogrouter;