var Domain = require('../schemas/domain');
const UserDomains = require('../schemas/user-domains');

function create(domain) {
    return Domain.create({name: domain.name, url: domain.url });
}

function list() {
    return Domain.find({});
}

function saveUserDomains(userSuperId, domains) {
    return UserDomains.create({userSuperId: userSuperId, domains: domains});
}

function findUserDomains(userSuperId) {
    return UserDomains.findOne({userSuperId: userSuperId});
}

function deleteUserDomains(_id) {
    return UserDomains.remove({_id: _id});
}

module.exports = { create, list, saveUserDomains, findUserDomains, deleteUserDomains };