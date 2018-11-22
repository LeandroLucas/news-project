var AppError = require('./AppError');
module.exports = class NotFoundException extends AppError {
    constructor() {
        super('Nenhum conteúdo encontrado', 404);
    }
}