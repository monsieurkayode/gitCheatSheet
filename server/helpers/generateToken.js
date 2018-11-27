import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const {
  TOKEN_VALIDITY,
  ISSUER,
  SECRET_KEY
} = process.env;

const generateToken = payload => jwt
  .sign(payload, SECRET_KEY, {
    expiresIn: TOKEN_VALIDITY,
    issuer: ISSUER
  });

export default generateToken;
