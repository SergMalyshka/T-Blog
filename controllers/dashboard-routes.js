const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['id', 'title', 'text', 'created_at'],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })

        const posts = postData.map(post => post.get({ plain: true }))
        res.render('dashboard', { posts, loggedIn: req.session.loggedIn })

    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('edit/:id', withAuth, async (req, res) => {
    try {
        const singlePostData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        })


        if (!singlePostData) {
            res.status(404).json({ message: 'No post found with corresponding ID' })
            return
        }

        const post = singlePostData.get({ plain: true })
        res.render('edit-post', {
            post,
            loggedIn: req.session.loggedIn
        })

    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/new', (req, res) => {
    res.render('new-post', { loggedIn: req.session.loggedIn })
})

module.exports = router;