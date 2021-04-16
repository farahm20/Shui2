const { Router } = require('express');
const { db } = require('./db');
const router = new Router();
const jwt = require('jsonwebtoken');


//getting hastags from only one user

router.get('/', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    console.log('token in hashtag, ', token)

    try {
        console.log('in the try ')

        const verified_user = jwt.verify(token, process.env.JWT_KEY);
        console.log('Verified user for hastags', verified_user);

        const user = db.get('users').find({ uuid: verified_user.uuid }).value();
        console.log('User from hastags ', user.hashtag)
        res.send(user.hashtag)
    } catch {
        res.status(400).send('Some thing not working in hashtag!')
    }
});

module.exports = router;