const Joi = require('joi');

module.exports = function (requestBody) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(20).required()
    });

    return schema.validate(requestBody, {
        abortEarly: false
    });
}