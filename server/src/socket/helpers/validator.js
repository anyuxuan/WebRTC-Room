import { config } from '../../config';
import jwt from 'jsonwebtoken';

const TOKEN_ERR_MSG = {
  TokenExpiredError: 'token expired',
  JsonWebTokenError: 'token malformed',
  NotBeforeError: 'token not active',
};

export function isTokenValid(token) {
  const result = {
    isValid: false,
    errMsg: '',
  };
  try {
    jwt.verify(token, config.PRIVATE_KEY);
    result.isValid = true;
  } catch (err) {
    result.errMsg = TOKEN_ERR_MSG[err.name] || 'Authentication error';
  }
  return result;
}
