const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('43e1cbe6b8084b90844cde02457ac70d');

function test() {
    newsapi.v2.topHeadlines({
        language: 'pt',
        country: 'br'
    }).then(response => {
        console.log(response);
        /*
          {
            status: "ok",
            articles: [...]
          }
        */
    });
}

module.exports = { test };