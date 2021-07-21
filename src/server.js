require('dotenv').config()
const configs = require('../configs');

const express = require('express');
const  mongoose = require('mongoose')
const logRegState = require('./routes/logRegState')
const userState = require('./routes/userState')
const app = express();

app.use(express.json());
app.use('/', logRegState);
app.use('/',userState);

(async () => {
    try {
        await mongoose.connect(configs.db.url, configs.db.options);
        console.log('Connection to DB Successful');
        app.listen(configs.env.PORT, () => {
            console.log(`Server is running ${configs.env.PORT}`);
          });
    } catch (err) {
        console.log('Connection to DB Failed',err);
    }
})();