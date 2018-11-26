var express = require('express');
var router = express.Router();
var newsService = require('../services/news-service');
const authysService = require('../services/authys-service');

router.get('/', async function (req, res, next) {
    try {
        let token = req.headers.token;
        let user = tryToFindUser(token);
        let search = req.query.search;
        let page = req.query.page;
        let resp = await newsService.findNews(user, page, search);
        res.json(resp);
    } catch (error) {
        console.error(error);
        res.sendStatus(error.status || 500);
    }
});

async function tryToFindUser(token) {
    try {
        if(token) {
            return await authysService.getUserBySessionToken(token);
        } else {
             return null;
        }
    } catch(e) {
        return null;
    }
}

module.exports = router;