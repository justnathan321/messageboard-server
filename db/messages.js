const db = require('./connection');
const Joi = require('joi');

const schema = Joi.object().keys({
    username: Joi.string().alphanum().max(25).required(),
    subject: Joi.string().max(25).required(),
    message: Joi.string().max(500).required(),
    imageURL: Joi.string().uri({
        scheme: [
            //only URLs with https
            /https?/
        ]
    }).allow('').max(65)
});

const messages = db.get('messages');

function getAll() {
    return messages.find();
}

function create(message) {
    if(!message.username) message.username = 'Anonymous'
    const result = schema.validate(message);
    if(result.error == null){
        message.created = new Date();
        return messages.insert(message);
    }else{
        return Promise.reject(result.error)
    }
}

//Making getAll available in other files (for example in index.js)
module.exports = {
    getAll,
    create
}