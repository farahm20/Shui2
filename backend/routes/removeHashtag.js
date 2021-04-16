const { Router } = require('express');
const { db } = require('./db');
const router = new Router();
const jwt = require('jsonwebtoken');

router.delete('/', (req, res) => {
    console.log("IN DELET REMOVE")

    console.log("BACKEND: deleteHAshtag: ", req.body.hashtags);
    const token = req.headers['authorization'].split(' ')[1];
    console.log("Token from DELETEHASHTAG: ", token);

    try {
        const verifiedUser = jwt.verify(token, process.env.JWT_KEY)
        console.log("Verifieduser from DELETE: ", verifiedUser)

        const duser = db.get('users').value();
        console.log("Backend: USER HASHSTAGs. ", duser.hashtags);

        const user = db
            .get('users')
            .find({ uuid: verifiedUser.uuid })
            .filter({ hashtags: req.body.hashtags })
            .remove()
            .write();

        console.log("HASHTAGS for USER: ", user.hashtags);
        res.send(user.hashtags);
    } catch (err) {
        res.status(401).send('Error in delete');
        console.log(err)
    }
});

module.exports = router;