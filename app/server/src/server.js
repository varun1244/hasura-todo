const path = require('path')
global.__appRoot = path.resolve(__dirname, '../')

const { jwkPublicKey } = require('./config/keys')

const express = require('express')
const bodyParser = require('body-parser')

const { handleError } = require('./helpers/error')

const app = express()

const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use('/api', require('./apiRouter'))

app.get('/.well-known/openid-configuration/graphql', (req, res) => {
  res.json({ keys: [jwkPublicKey()] })
})

app.use((err, req, res, next) => {
  handleError(err, res)
})

app.listen(PORT)
