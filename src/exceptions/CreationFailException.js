var AppError = require('./AppError');
module.exports = class CreationFailException extends AppError {
    constructor() {
        super('Falha ao criar.', 500);
    }
}