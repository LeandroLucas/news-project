var mongoose = require('mongoose');

var DomainSchema = new mongoose.Schema({
    name: String,
    url: String,
    createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Domain', DomainSchema);