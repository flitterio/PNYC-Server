const path = require('path')
const express = require('express')
const xss = require('xss')
const BathroomsService = require('./bathrooms-service')
//const RatesService = require('../rates/rates-service')
const bathroomsRouter = express.Router()
const jsonParser = express.json()

// const serializeBathroom = bathroom => ({
//     id: bathroom.id,
//     br_name: xss(bathroom.br_name),
//     lat: bathroom.lat,
//     lng: bathroom.lng,
//     description: xss(bathroom.description),
//     user_id: bathroom.user_id,
//     category: bathroom.category,
//     tags: {
//         id: tags.id,
//         tag: tags.tag,
//     }
// })

bathroomsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        //const bathrooms = []
        BathroomsService.getAllBathrooms(knexInstance)
       
        //can add information to the bathrooms array, then return final array with response
        .then(bathrooms => {
            console.log('bathrooms', bathrooms)
            res.json(bathrooms.Results.rows.map(BathroomsService.serializeBathroom))
        })
        .catch(next)
  })
//   .delete((req, res, next) => {
//     BathroomsService.deleteBathroom(
//         req.app.get('db'),
//         req.params.bathroom_id
//     )
//     .then(() => {
//         res.status(204).end()
//     })
//     .catch(next)
//   })

.post(jsonParser, (req, res, next) => {
    const{id, br_name, lat, lng, user_id, category, description='Bathroom' } = req.body
    const newBathroom = { id, br_name, lat, lng, user_id, category}

    for(const [key, value] of Object.entries(newBathroom)) {
        if (value == null) {
            return res.status(400).json({
                error: {message: `Missing '${key}' in request body` }
            })
        }
    }

    newBathroom.description = description 
    BathroomsService.insertBathroom(
        req.app.get('db'),
        newBathroom
    )

        .then(bathroom => {
            res 
                .status(201)
                .location(path.posix.join(req.originalUrl + `/${bathroom.id}`))
                .json(serializeBathroom(bathroom))
        })
        .catch(next)
    })

bathroomsRouter
    .route('/:bathroom_id')
    .all((req, res, next) => {
        BathroomsService.getById(
            req.app.get('db'),
            req.params.bathroom_id
        )
        .then(bathroom => {
            if (!bathroom) {
                return res.status(404).json({
                    error: { message: `Bathroom doesn't exist` }
                })
            }
            res.bathroom = bathroom 
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(BathroomsService.serializeBathroom(res.bathroom))
    })
    // .delete((req, res, next) => {
    //     BathroomsService.deleteBathroom(
    //         req.app.get('db'),
    //         req.params.bathroom_id
    //     )
    //     .then(numRowsAffected => {
    //         res.status(204).end()
    //     })
    //     .catch(next)
    // })
    .patch(jsonParser, (req, res, next) => {
        const { br_name, description} = req.body
        const bathroomToUpdate = { br_name, description }

        const numberOfValues = Object.values(bathroomToUpdate).filter(Boolean).length
        if(numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain either 'name' or 'description'`
                }
            })
        }
        BathroomsService.updateBathroom(
            req.app.get('db'),
            req.params.bathroom_id,
            bathroomToUpdate
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })

  module.exports = bathroomsRouter