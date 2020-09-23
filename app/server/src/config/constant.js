const path = require('path')

module.exports = {
  API_SERVER: process.env.API_SERVER || 'http://host.docker.internal:8081/v1/graphql',
  HASURA_GRAPHQL_ADMIN_SECRET: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  PRIVATE_KEY_PATH: path.resolve(__appRoot, process.env.CERT_PATH || './certs/private.key') // Mount files relative to`app/`
}
