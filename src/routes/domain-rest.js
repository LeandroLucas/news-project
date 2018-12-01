var express = require('express');
var router = express.Router();
const domainService = require('../services/domain-service');
const authysService = require('../services/authys-service');

router.get('/', async function (req, res, next) {
    try {
        let token = req.headers.token;
        const user = await authysService.tryToFindUser(token);
        let resp = await domainService.list(user);
        res.json(resp);
    } catch (error) {
        console.error(error);
        res.sendStatus(error.status || 500);
    }
});

module.exports = router;