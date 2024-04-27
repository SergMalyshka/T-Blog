const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: postAttributes,
            include: includedPostData
        })

        const data = postData.map(post => post.get({ plain: true }))

        res.render('homepage', {
            data,
            loggedIn: req.session.loggedIn
        })
    } catch (err) {
        res.status(500).json(err)
    }

})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/post/id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: postAttributes,
            include: includedPostData
        })

        if (!postData) {
            res.status(400).json({message: "No post with provided ID found"})
        }

        const data = postData.get({plain: true})

        res.render("individual-post", {
            data,
            loggedIn: res.session.loggedIn
        })
    } catch {err} {
        res.status(500).json(err)
    }

})


const includedPostData = [
    {
        model: Comment,
        attributes: [
            'id',
            'text',
            'post_id',
            'user_id',
            'created_at'
        ]
    },
    {
        model: User,
        attributes: ['username']
    }
]

const postAttributes = [
    'id',
    'title',
    'text',
    'created_at'
]

module.exports = router;