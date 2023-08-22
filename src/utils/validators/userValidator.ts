import * as Joi from '@hapi/joi';

export const userSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(60)
    .required()
    .messages({ 'string.empty': 'Nome é um campo obrigatório.' }),
  email: Joi.string().email().required().messages({
    'string.empty': 'E-mail é um campo obrigatório.',
    'string.email': 'Formato do e-mail é inválido.',
  }),
  password: Joi.string()
    .min(6)
    .max(40)
    .required()
    .messages({ 'string.empty': 'Senha é um campo obrigatório.' }),
  secret: Joi.string()
    .required()
    .messages({ 'string.empty': 'Secret é um campo obrigatório.' }),
  token: Joi.string()
    .required()
    .messages({ 'string.empty': 'Código é um campo obrigatório.' }),
});
