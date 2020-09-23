const fetch = require('node-fetch')
const { API_SERVER, HASURA_GRAPHQL_ADMIN_SECRET } = require('../config/constant')
const { ErrorHandler } = require('./error')

const execute = async (query, variables) => {
  try {
    const fetchResponse = await fetch(API_SERVER, {
      method: 'POST',
      body: JSON.stringify({
        query,
        variables
      }),
      headers: {
        'x-hasura-admin-secret': HASURA_GRAPHQL_ADMIN_SECRET
      }
    })

    return fetchResponse.json()
  } catch (err) {
    console.error('[GRAPHQL] : ', err)
    return ({
      error: {
        message: 'Server not available, please try again later'
      }
    })
  }
}

module.exports = execute
