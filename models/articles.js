const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: String,
    author: String,
    articleText: String,
    creationDate: { type: Date, default: Date.now }
});

module.exports = ArticleSchema;
