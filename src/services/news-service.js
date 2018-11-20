const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('43e1cbe6b8084b90844cde02457ac70d');

function listTopHeadlines() {
    return await newsapi.v2.topHeadlines({
        language: 'pt',
        country: 'br'
    });
}

async function listNews() {
    let preparedDomains = await prepareDomains();
    console.log(preparedDomains);
    let resp = await newsapi.v2.everything({
        domains: preparedDomains,
        sortBy: 'publishedAt'
    });
    return resp;
}

async function prepareDomains() {
    let allDomains = await listAllAvailableDomains();
    let domains = '';
    allDomains.forEach(d => {
        domains += d + ', '
    });
    return domains;
}

async function listAllAvailableDomains() {
    let resp = listTopHeadlines();
    let domains = [];
    for(let i = 0; i < resp.articles.length; i ++) {
        pushUnique(domains, resp.articles[i].source.name.toLowerCase());
    }
    return domains;
}

function pushUnique(list, string) {
    if(!list.includes(string)) {
        list.push(string);
    }
}

module.exports = { listAllAvailableDomains, listNews };