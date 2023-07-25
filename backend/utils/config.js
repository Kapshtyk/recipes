require('dotenv').config()

const PORT = process.env.PORT || 3005
const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
const TOKEN_EXPIRATION = 60 * 60 * 24 * 7

module.exports = {
  MONGODB_URI,
  PORT,
  TOKEN_EXPIRATION
}
