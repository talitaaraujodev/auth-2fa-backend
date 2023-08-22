import * as Joi from '@hapi/joi';

export const authSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'E-mail é um campo obrigatório.',
    'string.email': 'Formato do e-mail é inválido',
  }),
  password: Joi.string().min(6).max(40).required().messages({
    'string.empty': 'Senha é um campo obrigatório.',
    'string.min': 'Senha deve ter pelo menos 6 caracteres',
    'string.max': 'Senha deve no máximo 40 caracteres',
  }),
  token: Joi.string().required().messages({
    'string.empty': 'Código é um campo obrigatório.',
  }),
});
