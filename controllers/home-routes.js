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
            posts: data,
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

router.get('/post/:id', async (req, res) => {
    try {
        const response = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: postAttributes,
            include: includedPostData
        })

        if (!response) {
            res.status(400).json({ message: "No post with provided ID found" })
        }

        const data = response.get({ plain: true })

        res.render('individual-post', {
            post: data,
            loggedIn: req.session.loggedIn
        })
    } catch (err) {
        res.status(500).json(err)
    }

})

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'text',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'text',
                    'post_id',
                    'user_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No Post found with this id' });
                return;
            }
            //serialize the data
            const post = dbPostData.get({ plain: true });

            //pass data to the template
            res.render('individual-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



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