const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('43e1cbe6b8084b90844cde02457ac70d');
const domainService = require('./domain-service');
const ValidationException = require('../exceptions/ValidationException');

async function listTopHeadlines() {
    return await newsapi.v2.topHeadlines({
        language: 'pt',
        country: 'br'
    });
}

async function findNews(user, page, search) {
    if(search) {
        return await searchPersonalizedNews(user, search);
    } else {
        return await listPersonalizedNews(user, page);
    }
}

async function listPersonalizedNews(user, page) {
    if (!page) page = 1;
    let domains = await findDomainsForUser(user);
    const preparedDomains = prepareDomains(domains);
    return listNews(preparedDomains, page);
}

async function searchPersonalizedNews(user, search) {
    if(!search) {
        throw new ValidationException();
    }
    let domains = await findDomainsForUser(user);
    const preparedDomains = prepareDomains(domains);
    return await searchNews(preparedDomains, search);
}

async function findDomainsForUser(user) {
    let domains = null;
    if (user) {
        let userDomains = await domainService.findUserDomains(user.superId);
        if(userDomains) {
            domains = userDomains.domains;
        }
    }
    if (!domains) {
        domains = await domainService.list();
    }
    return domains;
}

async function listNews(preparedDomains, page) {
    let resp = await newsapi.v2.everything({
        page: page,
        domains: preparedDomains,
        language: 'pt',
        sortBy: 'publishedAt',
        pageSize: 100
    });
    return resp;
}

async function searchNews(preparedDomains, search) {
    let resp = await newsapi.v2.everything({
        domains: preparedDomains,
        language: 'pt',
        sortBy: 'publishedAt',
        pageSize: 100,
        q: search
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

module.exports = { listAllAvailableDomains, findNews };