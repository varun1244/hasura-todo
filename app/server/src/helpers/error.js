class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

const defaultErrorMessage = Object.freeze({
  '400': 'Invalid request',
  '401': 'Unauthorized',
  '403': 'Forbidden',
  '404': 'Resource not found',
  '500': 'Internal Server Error'
})

const handleError = (err, res) => {
  const { statusCode = 500, message = defaultErrorMessage[statusCode] } = err
  res.status(statusCode).json({
    status: 'error',
    message,
    statusCode,
  })
}

module.exports = {
  ErrorHandler,
  handleError
}
