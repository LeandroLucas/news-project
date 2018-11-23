var mongoose = require('mongoose');

var UserDomainsSchema = new mongoose.Schema({
    userSuperId: String,
    domains: Array,
    createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserDomains', UserDomainsSchema);