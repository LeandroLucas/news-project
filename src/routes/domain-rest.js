var express = require('express');
var router = express.Router();
var domainService = require('../services/domain-service');

router.get('/', async function (req, res, next) {
    try {
        let resp = await domainService.list();
        res.json(resp);
    } catch (error) {
        console.error(error);
        res.sendStatus(error.status || 500);
    }
});

module.exports = router;