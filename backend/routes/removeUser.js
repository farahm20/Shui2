const { Router } = require('express');
const { db } = require('./db');
const router = new Router();
const jwt = require('jsonwebtoken');

router.delete('/', (req, res) => {
    console.log("IN DELETE USER")

    const token = req.headers['authorization'].split(' ')[1];
    console.log("Token from DELETE USER: ", token);

    try {
        const verifiedUser = jwt.verify(token, process.env.JWT_KEY)
        console.log("Verifieduser DELETE USER: ", verifiedUser)

        const user = db
            .get('users')
            .find({ uuid: verifiedUser.uuid }).value();

        let streams = db.get("streams")
            .filter({ user: user.username })
            .forEach((stream) => {
                {
                    stream.user = "Anonymous";
                }
            }).write();

        console.log("USER REPLACED: ", streams);
        //remove user
        db.get("users").remove({ uuid: verifiedUser.uuid }).write();
        if (user == undefined)
            return res.sendStatus(404);

        res.status(200).send("User deleted");
    } catch (err) {
        res.status(401).send('Error in delete user');
        console.log(err)
    }
});

module.exports = router;