var AppError = require('./AppError');
module.exports = class NoContentException extends AppError {
    constructor() {
        super('Nenhum conteúdo encontrado', 204);
    }
}