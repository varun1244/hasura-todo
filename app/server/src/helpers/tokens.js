const OS = require('os')
const { generateJWT } = require('../config/keys')
const { API_SERVER } = require('../config/constant')

const newToken = ({ id, userName }) => {
  const issuer = OS.hostname()
  const userID = id + ''

  const signOptions = {
    audience: API_SERVER,
    expiresIn: '12h',
    algorithm: 'RS256'
  }

  const payload = {
    sub: userID,
    name: userName,
    iat: Date.now() / 1000,
    iss: issuer,
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-default-role': 'user',
      'x-hasura-user-id': userID,
      'x-hasura-role': 'user'
    }
  }

  return generateJWT(payload, signOptions)
}

module.exports = {
  newToken
}
