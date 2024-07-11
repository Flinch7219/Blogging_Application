const Blog = require('../models/blog');

exports.getAllBlogs = async (req, res) => {
    try {
        const allBlogs = await Blog.find();
        return res.status(200).send(allBlogs)
    } catch (error) {
        console.log(`Error:`, error.message);
        return res.status(400).send({message: 'Error fetching blogs'})
    }
}

exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send({ message: 'Blog not found' });
        }
        return res.status(200).send(blog);
    } catch (error) {
        console.log(`Error:`, error.message);
        return res.status(400).send({ message: 'Error fetching blog', error: error.message });
    }
}

exports.createBlog = async (req, res) => {
    try { 
        const newBlog = new Blog({
            ...req.body,
            author: req.user.username
        });
        await newBlog.save();
        return res.status(201).send(newBlog)
    } catch (error) { 
        console.log(`Error:`, error.message);
        return res.status(400).send({ message: 'Error creating a new blog' })
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send({ message: 'Blog not found' });
        }
        if (blog.author !== req.user.username) {
            return res.status(403).send({ message: 'You are not authorized to update this blog' });
        }
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id, 
            {
                ...req.body,
                updatedAt: new Date()
            }, 
            { new: true }
        );
        return res.status(200).send(updatedBlog);
    } catch (error) {
        console.log(`Error:`, error.message);
        return res.status(400).send({ message: 'Error updating blog' });
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send({ message: 'Blog not found' });
        }
        if (blog.author !== req.user.username) {
            return res.status(403).send({ message: 'You are not authorized to delete this blog' });
        }
        await Blog.findByIdAndDelete(req.params.id);
        return res.status(200).send({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.log(`Error:`, error.message);
        return res.status(400).send({ message: 'Error deleting blog' });
    }
}