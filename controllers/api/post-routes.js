const router = require('express').Router();
const { ConnectionAcquireTimeoutError } = require('sequelize');
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', async (req, res) => {
    try {
        const response = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [`id`, `title`, `text`, `created_at`],
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

        if (response) {
            res.json(response)
        } else {
            res.status(404).json({ message: "No post with that ID exists" })
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/', withAuth, async (req, res) => {

    console.log(req.body)
    console.log(req.session.user_id)

    try {
        const response = await Post.create({
            title: req.body.title,
            text: req.body.text,
            user_id: req.session.user_id
        })

        console.log(response)

        if (response) {
            res.json(response)
        } else {
            res.status(500).json({ message: "Unable to create post" })
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/:id', withAuth, async (req, res) => {
    try {
        const response = await Post.update({
            title: req.body.title,
            text: req.body.text
        },
            {
                where: {
                    id: req.params.id
                }
            })

        if (response) {
            res.json(response)
        } else {
            res.status(404).json({ message: "No post with that ID found" })
        }


    } catch (err) {
        res.status(500).json(err)
    }
})


router.delete("/:id", withAuth, async (req, res) => {

    try {
        const response = await Post.destroy({
            where: {
                id: req.params.id
            }
        })

        console.log(response)

        if (response) {
            res.json(response)
        } else {
            res.status(404).json({ message: "Post with that ID does not exist" })
        }
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;