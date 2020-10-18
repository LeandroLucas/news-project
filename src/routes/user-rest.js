var express = require('express');
var router = express.Router();
const authysService = require('../services/authys-service');
const domainService = require('../services/domain-service');

router.post('/domain', async function(req, res, next) {
    try {
        let token = req.headers.token;
        let user = await authysService.getUserBySessionToken(token);
        await domainService.saveUserDomains(user, req.body);
        res.json({});
    } catch (error) {
        console.error(error);
        res.sendStatus(error.status || 500);
    }
});

router.post('/', async function(req, res, next) {
    try {
        let body = req.body;
        let session = await authysService.createUser(body.email);
        res.json(session);
    } catch (error) {
        console.error(error);
        res.sendStatus(error.status || 500);
    }
});

router.post('/login', async function(req, res, next) {
    try {
        let body = req.body;
        let session = await authysService.login(body);
        res.json(session);
    } catch (error) {
        console.error(error);
        res.sendStatus(error.status || 500);
    }
});

router.delete('/logout', async function(req, res, next) {
    try {
        let token = req.headers.token;
        await authysService.logout(token);
        res.json();
    } catch (error) {
        console.error(error);
        res.sendStatus(error.status || 500);
    }
});

module.exports = router;