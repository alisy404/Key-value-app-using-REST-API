const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { KeyValueRouter } = require('./routes/store');
const { healthRouter } = require('./routes/health');

const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use('/health', healthRouter);
app.use('/store', KeyValueRouter);

console.log('Connecting to MongoDB...');
mongoose.connect(`mongodb://mongodb/${process.env.KEY_VALUE_DB}`,{
    auth: {
        username: process.env.KEY_VALUE_USER,
        password: process.env.KEY_VALUE_PASSWORD
    },
    connectTimeoutMS: 500
})
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log('Connection attempt to MongoDB failed.');
        console.error(err);
        
    });
