const express = require('express')
const path = require('path')
const { serializeUser } = require('./users-service')
const UsersService = require('./users-service')
const usersRouter = express.Router()
const jsonBodyParser = express.json()
const {requireAuth} = require('../middleware/jwt-auth')
const RatesService = require('../rates/rates-service')
const { serializeRate } = require('../rates/rates-service')
const FavoritesService = require('../favorites/favorites-service')

  usersRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const { password, username, fname, lname } = req.body
    const regUser = {password, username, fname, lname}
    
    for (const field of ['fname', 'lname', 'username', 'password'])
       if (!req.body[field])
         return res.status(400).json({
           error: `Missing '${field}' in request body`        
           })

    const passwordError = UsersService.validatePassword(password)
           
      if (passwordError)
        return res.status(400).json({ error: passwordError })
      
      UsersService.hasUserWithUserName(
        req.app.get('db'),
        username
      )
        .then(hasUserWithUserName => {
          if(hasUserWithUserName)
            return res.status(400).json({ error: `Username already taken`})

          return UsersService.hashPassword(password)
           .then(hashedPassword => {
              const newUser = {
                 username,
                 password: hashedPassword,
                 fname,
                 lname,
                 date_created: 'now()',
                   }
              
               return UsersService.insertUser(
                 req.app.get('db'),
                 newUser
               )
                 .then(user => {
                   res
                     .status(201)
                     .location(path.posix.join(req.originalUrl, `/${user.id}`))
                     .json(serializeUser(user))
             })
         })

      })
      .catch(next)
  })

usersRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    let userInfo = {}
    UsersService.getUserInfo(
      req.app.get('db'),
      req.user.id
    )
    .then(user =>{
       userInfo = user

       FavoritesService.getUserFavorites(
         req.app.get('db'),
         req.user.id
       )
       .then(favorites => {
         userInfo['favorites'] = favorites
         res.user = userInfo
         res.json(serializeUser(res.user))
         next()
       })
       .catch(next)
    })
      .catch(next)
  })

  // .get((req, res, next) => {
  //   res.json(UsersService.serializeUser(res.user))
  //   })
  
  usersRouter
    .route('/:user_id')
    .all(requireAuth)
    .all((req, res, next) => {
      UsersService.getUserInfo(
        req.app.get('db'),
        req.user.id
      )
        .then(user => {
          if (!user) {
            return res.status(404).json({
              error: { message: `User doesn't exist` }
            })
          }
          res.user = user
          next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
      res.json(serializeUser(res.user))
    })
    .delete((req, res, next) => {
      UsersService.deleteUser(
        req.app.get('db'),
        req.user.id
      )
        .then(numRowsAffected => {
          res.status(204).end()
        })
        .catch(next)
    })
    .patch(jsonBodyParser, (req, res, next) => {
      const { fname, lname, username } = req.body
      const userToUpdate = { fname, lname, username}
  
      const numberOfValues = Object.values(userToUpdate).filter(Boolean).length
      if (numberOfValues === 0)
        return res.status(400).json({
          error: {
            message: `Request body must contain either first name, last name, or username`
          }
        })
  
      UsersService.updateUser(
        req.app.get('db'),
        req.user.id,
        userToUpdate
      )
        .then(numRowsAffected => {
          res.status(204).end()
        })
        .catch(next)
    })

    usersRouter
    .route('/:user_id/rates')
    .all(requireAuth)
    .get((req, res, next ) => {
        const knexInstance = req.app.get('db')
        RatesService.getUserRates(knexInstance, req.user.id)  
        .then(favorites => {
            res.json(favorites.map(RatesService.serializeRate))
        })
        .catch(next)
    })
  
module.exports = usersRouter