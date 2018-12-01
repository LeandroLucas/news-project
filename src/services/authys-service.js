const request = require('request');
const CreationFailException = require('../exceptions/CreationFailException');
const UserNotFoundExcption = require('../exceptions/UserNotFoundException');
const SessionNotFoundExecption = require('../exceptions/SessionNotFoundException');

async function tryToFindUser(token) {
    try {
        if (token) {
            return await getUserBySessionToken(token);
        } else {
            return null;
        }
    } catch (e) {
        console.log('Error: ' + e);
        return null;
    }
}

async function createUser(email) {
    let resp = await new Promise((resolve, reject) => {
        request.post(getOptions('/user/easy-email', { email: email },
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
        request.post(getOptions('/user/login', { login: user.email, password: user.password },
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
        request.get(getOptions('/user/verify/' + token, null,
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
        request.post(getOptions('/user/logout/' + token, null,
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
        request.get(getOptions('/user/find/' + token, null,
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
        url: 'http://35.199.93.229/utilityAccess' + path,
        headers: {
            accessKey: '3ea951ef-8bae-4926-8c77-b154ca47286a',
            secretKey: 'e12425a3-b9c0-4814-93ca-3c4d7ea51ff3'
        },
        callback
    };
    if (body) {
        options.json = body;
    }
    return options;
}

module.exports = { createUser, login, logout, verify, getUserBySessionToken, tryToFindUser };