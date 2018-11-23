var express = require('express');
var router = express.Router();
var newsService = require('../services/news-service');
const authysService = require('../services/authys-service');

router.get('/', async function (req, res, next) {
    try {
        let token = req.headers.token;
        let user = null;
        if(token) {
            user = await authysService.getUserBySessionToken(token);
        }
        let page = req.query.page;
        let resp = await newsService.listPersonalizedNews(user, page);
        res.json(resp);
    } catch (error) {
        console.error(error);
        res.sendStatus(error.status || 500);
    }
});

module.exports = router;