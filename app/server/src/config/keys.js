const { JWK } = require('jose')
const JWT = require('jsonwebtoken')

class Keys {
  constructor() {
    this.jwk_key = JWK.generateSync('RSA', 2048, { use: 'sig', alg: 'PS256' })
  }

  generateJWT = (payload, signOptions) => JWT.sign(payload, this.jwk_key.toPEM(true), signOptions)

  jwkPublicKey = () => this.jwk_key.toJWK()
}

module.exports = new Keys()
