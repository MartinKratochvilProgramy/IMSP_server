const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET || 'secretkey'

interface TokenPayloadInterface {
  id: string;
}

export const createToken = (payload: TokenPayloadInterface) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: '10s' })
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, jwtSecret)
  } catch (error) {
    return false
  }
}
