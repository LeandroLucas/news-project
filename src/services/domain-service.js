var domainDao = require('../daos/domain-dao');
var CreationFailException = require('../exceptions/CreationFailException');

async function create(domain) {
    let resp = await domainDao.create(domain);
    if(resp) {
        return resp;
    } else {
        throw new CreationFailException();
    }
}

async function list() {
    let domains = await domainDao.list();
    return removeDomainsId(domains);
}

function removeDomainsId(domains) {
    domains.forEach(d => {
        delete d._id;
    });
    return domains;
}

async function saveUserDomains(user, domains) {
    let userDomains = await findUserDomains(user.superId);
    if(userDomains) {
        await domainDao.deleteUserDomains(userDomains._id);
    }
    return await domainDao.saveUserDomains(user.superId, domains);
}

async function findUserDomains(userSuperId) {
    return await domainDao.findUserDomains(userSuperId);
}

module.exports = { create, list, saveUserDomains, findUserDomains };