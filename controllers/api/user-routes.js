const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', async (req, res) => {
    console.log("this is the request body")
    console.log(req.body)
    try {
        const userResponse = await User.create({
            username: req.body.username,
            password: req.body.password
        })

        req.session.save(() => {
            req.session.user_id = userResponse.id;
            req.session.username = userResponse.username
            req.session.loggedIn = true
        })

        res.json(userResponse)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const loggedInUser = await User.findOne({
            where: {
                username: req.body.username
            }
        })

        if (!loggedInUser) {
            res.status(400).json({ message: "No such user found" })
            return
        }

        const passwordMatches = loggedInUser.checkPassword(req.body.password)

        if (!passwordMatches) {
            res.status(400).json({ message: "Password is incorrect" })
            return
        }

        req.session.save(() => {
            req.session.user_id = loggedInUser.id;
            req.session.username = loggedInUser.username;
            req.session.loggedIn = true;
            res.status(200).json({ user: loggedInUser, message: "Login Success" })
        })
    } catch (err) {
        res.status(500).json(err)
    } 
    
})

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        }) 
    } else {
        res.status(400).end()
    }
})


module.exports = router;