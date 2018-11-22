const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('43e1cbe6b8084b90844cde02457ac70d');

async function listTopHeadlines() {
    return await newsapi.v2.topHeadlines({
        language: 'pt',
        country: 'br'
    });
}

async function listNews(domains) {
    let preparedDomains = prepareDomains(domains);
    let resp = await newsapi.v2.everything({
        domains: preparedDomains,
        sortBy: 'publishedAt'
    });
    return resp;
}

function prepareDomains(domains) {
    let domains = '';
    allDomains.forEach(d => {
        domains += d.url + ', '
    });
    return domains;
}

async function listAllAvailableDomains() {
    let resp = await listTopHeadlines();
    let domains = [];
    for(let i = 0; i < resp.articles.length; i ++) {
        pushUnique(domains, resp.articles[i].source.name);
    }
    return domains;
}

function pushUnique(list, string) {
    if(!list.includes(string)) {
        list.push(string);
    }
}

module.exports = { listAllAvailableDomains, listNews };