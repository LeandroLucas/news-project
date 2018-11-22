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
    return await domainDao.list();
}

module.exports = { create, list };