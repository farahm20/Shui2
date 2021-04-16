const { Router } = require('express');
const { db } = require('./db');
const router = new Router();
const jwt = require('jsonwebtoken');


//getting stream from only one user
router.get('/', (req, res) => {
    try {
        const streams = db.get('streams').value();
        res.send(streams)
    } catch (err) {
        res.status(400).send('Error in streams get');
        console.log(err)
    }
})

module.exports = router;