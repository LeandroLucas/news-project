var AppError = require('./AppError');
module.exports = class EditFailException extends AppError {
    constructor() {
        super('Falha ao editar.', 500);
    }
}