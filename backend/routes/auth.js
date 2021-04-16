const { Router, response } = require('express');
const { db } = require('./db');
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const router = new Router();

router.post('/', async (req, res) => {
    const credentials = req.body;
    res.send(credentials)
})

router.post('/login', async (req, res) => {
    // does user exist
    let user = db
        .get('users')
        .find({ username: req.body.username })
        .value()

    console.log(user);

    if (user) {

        // Check password
        const valid = await bcrypt.compare(req.body.password, user.password)

        // if valid
        if (valid) {

            // decrypt userkey we get a  bytes string
            const bytes = CryptoJS.AES.decrypt(user.userkey, process.env.SECRET);
            const DECRYPTED_USER_KEY = bytes.toString(CryptoJS.enc.Utf8);
            console.log('Decrypted userkey: ', DECRYPTED_USER_KEY)
            // JWT that we send back to the user
            const token = jwt.sign({ uuid: user.uuid }, process.env.JWT_KEY);
            console.log('Token: ', token)
            // return key + JWT to frontend
            res.send({
                token: token,
                userkey: DECRYPTED_USER_KEY
            });

        } else {
            // alert("Password and username dont match");
            res.status(403).send('No data for you!');
        }

    } else {
        res.status(400).send('Whoopsie!');
    }

})


module.exports = router;
