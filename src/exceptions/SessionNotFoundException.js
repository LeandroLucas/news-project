var AppError = require('./AppError');
module.exports = class SessionNotFoundException extends AppError {
    constructor() {
        super('Sessão não encontrada.', 404);
    }
}