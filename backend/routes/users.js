const { Router } = require('express');
const { db } = require('./db');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const CryptoJS = require('crypto-js');

const router = new Router();

router.post('/', async (req, res) => {
    console.log(req.body);
    if (req.body.username && req.body.password) {
        //if the request has a body and password

        //encrypt password with userkey
        const HASHED_PW = await bcrypt.hash(req.body.password, 10); //10 are salt rounds. we crypt it 10 times
        console.log('Hashed passowrd: ', HASHED_PW);

        //1: generate userkey
        const USER_KEY = shortid.generate();
        console.log('User key: ', USER_KEY);

        //encrypt USER_KEY with our SECRET
        const ENCRYPTED_USER_KEY = CryptoJS.AES.encrypt(USER_KEY, process.env.SECRET).toString(); //bring our secret from .env
        console.log('Encrypted user key: ', ENCRYPTED_USER_KEY);

        let user = {
            uuid: shortid.generate(),
            username: req.body.username,
            password: HASHED_PW, //Hashed with bcrypt
            userkey: ENCRYPTED_USER_KEY, //encrypted with SECRET
            hashtag: []
        }

        console.log('User going to db is: ', user)
        console.log('Secret form env: ', process.env.SECRET);

        //add user to database
        db.get('users')
            .push(user)
            .write()

        //all ok to frontend
        res.status(201).send('New user created');
    } else {
        res.status(400).send('Whoops! Did you really entered the credentials correctly?')
    }
})

module.exports = router;