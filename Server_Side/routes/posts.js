const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/posts/item/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/posts', async (req, res) => {
    const { title, content, hashtags, likes } = req.body;
    
    try {
        const newPost = new Post({ title, content, hashtags, likes });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/posts/:id', async (req, res) => {
    const { title, content, hashtags, likes } = req.body;
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, { title, content, hashtags, likes }, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
