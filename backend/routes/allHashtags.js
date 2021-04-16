const { Router } = require('express');
const { db } = require('./db');
const CryptoJS = require('crypto-js');
const router = new Router();
const jwt = require('jsonwebtoken');


//get all the hashtags in the database
// router.get('/', (req, res) => {
//     try {
//         const streams = db.get('streams')
//         const hashtags = streams.filter('hashtag')
//         console.log('hashtag', hashtags)
//         res.send(hashtags);
//     } catch {
//         res.status(400).send('No Hashtags found...')
//     }
// });
// router.get('/', (req, res) => {
//     const token = req.headers['authorization'].split(' ')[1];
//     console.log("Token from get streams: ", token);

//     try {
//         const verifiedUser = jwt.verify(token, process.env.JWT_KEY);
//         console.log("Verify Token: ", verifiedUser.uuid);
//         const user = db.get('users').find({ uuid: verifiedUser.uuid }).value();

//         if (user) {
//             const streams = db.get('streams').value();
//             console.log("Backend: Streams. ", streams);
//             res.send(streams);
//         }

//     } catch (err) {
//         res.status(400).send('Error in streams get');
//         console.log(err)
//     }
// })
router.get('/', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    console.log("Token from get streams: ", token);

    try {
        const verifiedUser = jwt.verify(token, process.env.JWT_KEY);
        console.log("Verify Token: ", verifiedUser.uuid);
        const user = db.get('users').find({ uuid: verifiedUser.uuid }).value();

        const filterflowTags = (stream) => {
            const filteredTags = stream.hashtag.filter((tag) =>
                user.hashtag.includes(tag)
            )
            return filteredTags.length > 0;
        }

        if (user.hashtag.length > 0) {
            let streams = [...db.get('streams').filter(filterflowTags).value()]

            let newStreamsArray = streams.map(stream => {
                try {
                    let decrypt = CryptoJS.AES.decrypt(stream.info, process.env.SECRET).toString(CryptoJS.enc.Utf8)

                    let encrypted = CryptoJS.AES.encrypt(decrypt, token).toString()

                    stream = { ...stream, info: encrypted }

                    return stream
                } catch (error) {
                    console.log(error)
                }
            })
            res.status(200).send(newStreamsArray)
        } else {
            let streams = db.get('streams').value()
            let newStreamsArray = streams.map(stream => {
                try {
                    let decrypt = CryptoJS.AES.decrypt(stream.info, process.env.SECRET).toString(CryptoJS.enc.Utf8)

                    let encrypted = CryptoJS.AES.encrypt(decrypt, token).toString()

                    stream = { ...stream, info: encrypted }

                    return stream
                } catch (error) {
                    console.log(error)
                }
            })
            res.status(200).send(newStreamsArray)
        }

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = router;