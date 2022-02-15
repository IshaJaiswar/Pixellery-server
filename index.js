const express = require('express')
const app = express()
const cors = require('cors');
const database = require('./config/database');
const port = process.env.PORT || 3005

database.connect((err) => {
    if (err) throw err;
    console.log("Connected")
});

// This is to allow our api for cross-origin resource sharing
app.use(cors());

// This is to allow our api for parsing json
app.use(express.json());

// This is to allow our api to receive data from a client app
app.use(express.urlencoded({
    extended: true
}));

app.use('/',[
    require('./routes/users'),
    require('./routes/auth'),
    require('./routes/likes'),
    require('./routes/collection')
]);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});