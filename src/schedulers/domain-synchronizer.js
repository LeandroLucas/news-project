var newsService = require('../services/news-service');
var domainService = require('../services/domain-service');

async function synchronizeDomains() {
    console.log('Rodando sincronização de domínios...')
    let currentDomains = await newsService.listAllAvailableDomains();
    let savedDomains = await domainService.list();
    let count = 0;
    for(let i = 0; i < currentDomains.length; i++){
        let cd = currentDomains[i];
        let save = true;
        for(let a = 0; a < savedDomains.length; a++) {
            sd = savedDomains[a];
            if(sd.url === cd.toLowerCase()) {
                save = false;
                break;
            }
        }
        if(save) {
            domainService.create(prepareDomain(cd));
            count++;
        }
    }
    console.log(count + ' dominios sincronizados.')
}

function prepareDomain(domainUrl) {
    if(domainUrl) {
        let splited = domainUrl.split('.');
        return {name: splited[0], url: domainUrl.toLowerCase()};
    }
    return null;
}

module.exports = { synchronizeDomains };