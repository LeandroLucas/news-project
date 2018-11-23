const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('43e1cbe6b8084b90844cde02457ac70d');
const domainService = require('./domain-service');

async function listTopHeadlines() {
    return await newsapi.v2.topHeadlines({
        language: 'pt',
        country: 'br'
    });
}

async function listPersonalizedNews(user, page) {
    if (!page) page = 1;
    let domains = null;
    if (user) {
        let userDomains = await domainService.findUserDomains(user.superId);
        if(userDomains) {
            domains = userDomains.domains;
        }
    }
    if (!domains || domains.length == 0) {
        domains = await domainService.list();
    }
    const preparedDomains = prepareDomains(domains);
    return listNews(preparedDomains, page);
}

async function listNews(preparedDomains, page) {
    let resp = await newsapi.v2.everything({
        page: page,
        domains: preparedDomains,
        language: 'pt',
        sortBy: 'publishedAt',
        pageSize: 100,
        excludeDomains: ''
    });
    return resp;
}

function prepareDomains(allDomains) {
    let domains = '';
    allDomains.forEach(d => {
        domains += d.url + ', '
    });
    return domains;
}

async function listAllAvailableDomains() {
    let resp = await listTopHeadlines();
    let domains = [];
    for (let i = 0; i < resp.articles.length; i++) {
        pushUnique(domains, resp.articles[i].source.name);
    }
    return domains;
}

function pushUnique(list, string) {
    if (!list.includes(string)) {
        list.push(string);
    }
}

module.exports = { listAllAvailableDomains, listPersonalizedNews };