const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const response = await Comment.findAll()
        res.json(response)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/', withAuth, async (req, res) => {
    try {
        if (req.session) {
            const response = await Comment.create({
                text: req.body.text,
                post_id: req.body.post_id,
                user_id: req.session.user_id
            })
            res.json(response)
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const response = await Comment.destroy({
            where: {
                id: req.params.id
            }
        })

        if (response) {
            res.json(response)
        } else {
            res.status(400).json({ message: "No post with such ID" })
        }
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;