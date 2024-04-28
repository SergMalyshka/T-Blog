const router = require('express').Router();
const { ConnectionAcquireTimeoutError } = require('sequelize');
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    console.log("INSIDE THE ROUTE")
    try {
        const postCreate = await Post.create({
            title: req.body.title,
            text: req.body.text,
            user_id: req.session.user_id
        })

        if (postCreate) {
            res.json(postCreate)
        } else {
            res.status(500).json({ message: "Unable to create a post" })
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedData = await Post.update({
            title: req.body.title,
            text: req.body.text
        },
            {
                where: {
                    id: req.params.id
                }
            })

        if (!updatedData) {
            res.status(404).json({ message: "No post with that ID found" })
        }

        res.json(updatedData)

    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;