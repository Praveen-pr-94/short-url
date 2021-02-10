const monoose = require('mongoose');
const urlSchema = new monoose.Schema({
    url: String,
    urlHash: String,
    shortUrl: String,
},{versionKey: false});
module.exports = monoose.model('Url' , urlSchema);