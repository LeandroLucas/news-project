var AppError = require('./AppError');
module.exports = class UserNotFoundException extends AppError {
    constructor() {
        super('Usuário não encontrado.', 404);
    }
}