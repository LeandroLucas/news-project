var AppError = require('./AppError');
module.exports = class ValidationException extends AppError {
    constructor() {
        super('Falha na validação do objeto.', 400);
    }
}