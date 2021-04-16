const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const App = express();

const auth = require('./routes/auth');
const users = require('./routes/users');
const addStream = require('./routes/addStream');
const allHashtags = require('./routes/allHashtags');
const hashtags = require('./routes/hashtags');
const addHashtag = require('./routes/addHashtag');
const removeHashtag = require('./routes/removeHashtag');
const removeUser = require('./routes/removeUser');
const isloggedin = require("./routes/isloggedin.js");

App.use(helmet());
App.use(express.json());
App.use(cors());

App.use('/auth', auth);
App.use('/users', users);
App.use("/addStream", addStream);
App.use("/addHashtag", addHashtag);
App.use('/allHashtags', allHashtags);
App.use('/hashtags', hashtags);
App.use('/removeHashtag', removeHashtag);
App.use('/removeUser', removeUser);
App.use("/isloggedin", isloggedin);


App.listen(4000, () => {
    console.log('Super secure server is up n running!')
})