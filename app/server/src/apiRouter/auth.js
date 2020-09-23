const express = require('express')
const bcrypt = require('bcryptjs')

const execute = require('../helpers/api')
const { SIGNUP_MUTATION, LOGIN_MUTATION } = require('../queries/authQueries')
const { newToken } = require('../helpers/tokens')

const router = express.Router()

router.post('/login', async (req, res) => {
  const { username, password } = req.body.input
  const { data, errors } = await execute(LOGIN_MUTATION, { username })
  if (errors) {
    return res.status(400).json({
      message: errors[0].message
    })
  }

  const user = data.users[0]

  if (user && bcrypt.compareSync(password, user.password)) {
    const id = user.id
    res.json({
      id,
      token: newToken({ id, username })
    })
  } else {
    return res.status(401).json({
      message: 'Invalid credentials'
    })
  }
})

const validatePassword = (pass, res) => {
  const result = pass && pass.length >= 8 && /[A-Z]+/.test(pass)
  if (!result) {
    res.status(400).json({
      message: 'Invalid password pattern. Password should have at least one uppercase character and 8 characters long'
    })
  }
  return result
}

router.post('/signup', async (req, res) => {
  const { name, username, password } = req.body.input
  if (!validatePassword(password, res)) return

  const hashedPassword = await bcrypt.hash(password, 10)

  const { data, errors } = await execute(SIGNUP_MUTATION, { name, username, password: hashedPassword })

  if (errors) {
    return res.status(400).json({
      message: errors[0].message
    })
  }

  const { id } = data.insert_users_one
  return res.json({
    id,
    token: newToken({ id, username })
  })
})

module.exports = router
