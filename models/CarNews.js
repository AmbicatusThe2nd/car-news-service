const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carNewsSchema = new Schema({
    title: {
        type: String
    },
    text: {
        type: String
    },
    date: {
        type: String
    },
    user: {
        id: {
            type: String
        },
        firstname: {
            type: String
        },
        lastname: {
            type: String
        },
    }
}, {collection: 'news'});

module.exports = mongoose.model('CarNews', carNewsSchema);
