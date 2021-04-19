require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const bathroomsRouter = require('./bathrooms/bathrooms-router')
const commentsRouter = require('./comments/comments-router')
const ratesRouter = require('./rates/rates-router')
const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router');

const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}))
app.use(cors())
app.use(helmet())

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/bathrooms', bathroomsRouter) 
app.use('/api/comments', commentsRouter)
app.use('/api/rates', ratesRouter)


app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: error.message, error }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app