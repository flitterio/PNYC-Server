const path = require('path')
const express = require('express')
const xss = require('xss')
const FavoritesService = require('./favorites-service')
const { requireAuth } = require('../middleware/jwt-auth')

const favoritesRouter = express.Router()
const jsonParser = express.json()

const serializeFavorite = favorite => ({
    id: favorite.id,
    user_id: favorite.user_id,
    bathroom_id: favorite.bathroom_id
})

favoritesRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next ) => {
        const knexInstance = req.app.get('db')
        FavoritesService.getUserFavorites(knexInstance, req.user.id)  
        .then(favorites => {
            res.json(favorites.map(serializeFavorite))
        })
        .catch(next)
    })
    //NEED GET BATHROOM FAVORITE COUNT
    .post(requireAuth, jsonParser, (req, res, next ) => {
        const { bathroom_id} = req.body
        let newFavorite = { bathroom_id}

        for (const [key, value] of Object.entries
        (newFavorite))
        if (value == null)
            return res.status(400).json({
                error: {message: `Missing '${key}' in request body` }
            })

        newFavorite.user_id = req.user.id

        return FavoritesService.insertFavorite(
            req.app.get('db'),
            newFavorite
        )
            .then(favorite =>{
                res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${favorite.id}`))
                .json(serializeFavorite(favorite))
            })
            .catch(next)
    })


    favoritesRouter
        .route('/:favoriteId')
        .all(requireAuth)
        .all((req, res, next) => {
            FavoritesService.getById(
              req.app.get('db'),
              req.params.favoriteId
            )
              .then(favorite => {
                if (!favorite) {
                  return res.status(404).json({
                    error: { message: `Favorite doesn't exist` }
                  })
                }
                res.favorite = favorite
                next()
              })
              .catch(next)
          })
          .get((req, res, next) => {
            res.json(serializeFavorite(res.favorite))
          })
          .delete((req, res, next) => {
            FavoritesService.deleteFavorite(
              req.app.get('db'),
              req.params.favoriteId
            )
              .then(numRowsAffected => {
                res.status(204).end()
              })
              .catch(next)
          })

          //DELETE FAVORITE, NO EDITING 
        //   .patch(jsonParser, (req, res, next) => {
        //     const {user_id, bathroom_id } = req.body
        //     const favoriteToUpdate = { user_id, bathroom_id }
        
        //     const numberOfValues = Object.values(favoriteToUpdate).filter(Boolean).length
        //     if (numberOfValues === 0)
        //       return res.status(400).json({
        //         error: {
        //           message: `Request body must contain either title, image, season, category, or favorite`
        //         }
        //       })
        
        //     FavoritesService.updateFavorite(
        //       req.app.get('db'),
        //       req.params.favoriteId,
        //       favoriteToUpdate
        //     )
        //       .then(numRowsAffected => {
        //         res.status(204).end()
        //       })
        //       .catch(next)
        //   })
        
        module.exports = favoritesRouter