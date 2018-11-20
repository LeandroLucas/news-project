var express = require('express');
var router = express.Router();
var newsService = require('../services/news-service');

router.get('/', async function (req, res, next) {
    try {
        newsService.test();
        res.json("huehuehue");
    } catch (error) {
        console.error(error);
        res.sendStatus(error.status || 500);
    }
});

module.exports = router;