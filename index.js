//To create a backend API
const express = require('express');
//Allow backend to talk with frontend
const cors = require('cors');
//Allow backend to read and understand data from frontend
const bodyParser = require('body-parser');
//For logging
const morgan = require('morgan');

const messages = require('./db/messages')

const app = express();

//Middleware setup
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Message Board! 🎊'
    });
});

app.get('/messages', (req, res) => {
    messages.getAll().then(messages => {
        res.json(messages)
    });
});

app.post('/messages', (req, res) => {
    console.log(req.body);
    messages.create(req.body).then((message) => {
        res.json(message);
     }).catch((error) => {
        res.status(500);
        res.json(error)
     });
});

const port = process.env.PORT || 1234;
app.listen(port, () => {
    console.log(`listening on ${port}`);
})