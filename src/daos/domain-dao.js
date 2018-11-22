var Domain = require('../schemas/domain');

function create(domain) {
    return Domain.create({name: domain.name, url: domain.url });
}

function list() {
    return Domain.find({});
}

module.exports = { create, list };