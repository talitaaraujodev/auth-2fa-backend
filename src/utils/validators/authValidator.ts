import * as Joi from '@hapi/joi';

export const authSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'E-mail é um campo obrigatório.',
    'string.email': 'Formato do e-mail é inválido',
  }),
  password: Joi.string()
    .min(6)
    .max(40)
    .required()
    .messages({ 'any.required': 'Senha é um campo obrigatório.' }),
  token: Joi.string()
    .required()
    .messages({ 'any.required': 'Código é um campo obrigatório.' }),
});
