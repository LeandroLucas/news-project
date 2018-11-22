var express = require('express');
var router = express.Router();
var newsService = require('../services/news-service');

router.get('/', async function (req, res, next) {
    try {
        let token = req.headers.token;
        // let user = await authysService.findUserBySessionToken(token);
        let page = req.query.page;
        console.log('page: ' + page);
        let resp = await newsService.listPersonalizedNews(null, page);
        res.json(resp);
    } catch (error) {
        console.error(error);
        res.sendStatus(error.status || 500);
    }
});

module.exports = router;