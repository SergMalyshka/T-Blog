const router = require('express').Router();
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
            res.status(500).json({message: "Unable to create a post"})
        }
    } catch (err) {
        res.status(500).json(err)
    }

})
module.exports = router;