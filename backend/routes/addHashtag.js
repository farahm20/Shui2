const { Router } = require("express");
const { db } = require("./db");
const router = new Router();
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
    console.log('ADD HASHTAG')

    const token = req.headers["authorization"].split(" ")[1];
    try {
        console.log("TOKEN ", token);
        const verifiedUser = jwt.verify(token, process.env.JWT_KEY);
        console.log("VERIFIED USER IN ADDHASHTAG: ", verifiedUser);

        const user = db
            .get("users")
            .find({ uuid: verified_user.uuid })
            .get("hashtag")
            .push(req.body.hashtag)
            .write();

        console.log("HASHTAGS FROM USER: ", user.hashtag);
        res.send(user.hashtag);
    } catch (error) {
        console.error(error);
        res.sendStatus(401);
    }
});

module.exports = router;
