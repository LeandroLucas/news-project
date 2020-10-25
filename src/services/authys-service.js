const request = require('request');
const CreationFailException = require('../exceptions/CreationFailException');
const UserNotFoundExcption = require('../exceptions/UserNotFoundException');
const SessionNotFoundExecption = require('../exceptions/SessionNotFoundException');

async function tryToFindUser(token) {
    try {
        if (token) {
            let user = await getUserBySessionToken(token);
            if(user) {
                return JSON.parse(user);
            }
        }
        return null;
    } catch (e) {
        console.log('Error: ' + e);
        return null;
    }
}

async function createUser(email) {
    let resp = await new Promise((resolve, reject) => {
        request.post(getOptions('/account/easy-email', { email: email },
            (err, httpResponse, body) => {
                if (err) reject(err);
                if (httpResponse.statusCode != 200) {
                    reject('Invalid status code <' + httpResponse.statusCode + '>');
                }
                resolve(body);
            }));
    }).catch((rej) => {
        console.log(rej);
        throw new CreationFailException();
    });
    return resp;
}

async function login(user) {
    let resp = await new Promise((resolve, reject) => {
        request.post(getOptions('/account/login', { login: user.email, password: user.password },
            (err, httpResponse, body) => {
                if (err) reject(err);
                if (httpResponse.statusCode != 200) {
                    reject('Invalid status code <' + httpResponse.statusCode + '>');
                }
                resolve(body);
            }));
    }).catch((rej) => {
        console.log(rej);
        throw new UserNotFoundExcption();
    });
    return resp;
}

async function verify(token) {
    await new Promise((resolve, reject) => {
        request.get(getOptions('/account/verify-session/' + token, null,
            (err, httpResponse, body) => {
                if (err) reject(err);
                if (httpResponse.statusCode != 200) {
                    reject('Invalid status code <' + httpResponse.statusCode + '>');
                }
                resolve(body);
            }));
    }).catch((rej) => {
        console.log(rej);
        throw new SessionNotFoundExecption();
    });
}

async function logout(token) {
    await new Promise((resolve, reject) => {
        request.delete(getOptions('/account/session/' + token, null,
            (err, httpResponse, body) => {
                if (err) reject(err);
                if (httpResponse.statusCode != 200) {
                    reject('Invalid status code <' + httpResponse.statusCode + '>');
                }
                resolve(body);
            }));
    }).catch((rej) => {
        console.log(rej);
        throw new SessionNotFoundExecption();
    });
}

async function getUserBySessionToken(token) {
    let resp = await new Promise((resolve, reject) => {
        request.get(getOptions('/account/' + token, null,
            (err, httpResponse, body) => {
                if (err) reject(err);
                if (httpResponse.statusCode != 200) {
                    reject('Invalid status code <' + httpResponse.statusCode + '>');
                }
                resolve(body);
            }));
    }).catch((rej) => {
        console.log(rej);
        throw new SessionNotFoundExecption();
    });
    return resp;
}

function getOptions(path, body, callback) {
    var options = {
        url: 'http://127.0.0.1:8080/authys/v1/utility-access' + path,
        headers: {
            accessKey: 'bfa8a472-e126-4868-9dfe-db062b75a864',
            secretKey: '8b77264e-bf1b-46ad-9037-150f643ce488'
        },
        callback
    };
    if (body) {
        options.json = body;
    }
    return options;
}

module.exports = { createUser, login, logout, verify, getUserBySessionToken, tryToFindUser };