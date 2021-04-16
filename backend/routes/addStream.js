const { Router } = require('express');
const { db } = require('./db');
const router = new Router();
const shortid = require('shortid');
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");

router.post('/', (req, res) => {
    if (!req.body.info || !req.body.hashtag) {
        return res.send('no content available');
    }
    const token = req.headers['authorization'].split(' ')[1];
    console.log("POST STREAM- TOKEN: ", token);
    try {
        const verifiedUser = jwt.verify(token, process.env.JWT_KEY)
        console.log("POST STREAM- VERIFIED USER: ", verifiedUser);

        const user = db.get('users').find({ uuid: verifiedUser.uuid }).value();
        console.log("POST STREAM- USER FOUND: ", user);

        const encryptedOwner = CryptoJS.AES.encrypt(
            user.uuid,
            process.env.SECRET
        ).toString();

        let newStream = {
            streamID: shortid.generate(),
            hashtag: req.body.hashtag,
            // info: req.body.info,
            info: CryptoJS.AES.encrypt(req.body.info, process.env.SECRET).toString(),
            user: user.username,
            owner: encryptedOwner,
            date: new Date().toLocaleString(),
        };

        console.log("New stream: ", newStream);
        db.get('streams').push(newStream).write();
        res.status(201).send('New stream added!')
    } catch (err) {
        res.status(400).send('Error in post');
        console.log(err)
    }
});

module.exports = router