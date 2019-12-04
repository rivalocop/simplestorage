const express = require('express');

require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Mashape-Authorization, X-File-Name, Cache-Control, Access-Control-Max-Age, portal, token, name, portalid, targetid");
    next();
})

const users = require('./routes/users');
const upload = require('./routes/upload');

app.use('/users', users);
app.use('/upload', upload)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})