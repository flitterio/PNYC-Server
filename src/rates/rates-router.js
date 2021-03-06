const path = require('path')
const express = require('express')
const xss = require('xss')
const RatesService = require('./rates-service')
const { serializeRate } = require('./rates-service')
const { requireAuth } = require('../middleware/jwt-auth')

const ratesRouter = express.Router()
const jsonParser = express.json()

ratesRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        RatesService.getAllRates(knexInstance)
        .then(rates => {
            res.json(rates.map(RatesService.serializeRate))
        })
        .catch(next)
  })

.post(requireAuth, jsonParser, (req, res, next) => {
    
    const{ rating, bathroom_id } = req.body
    let newRate = { rating }

    for(const [key, value] of Object.entries(newRate)) {
        if (value == null) {
            return res.status(400).json({
                error: {message: `Missing '${key}' in request body` }
            })
        }
    }
 
    newRate = {...newRate, bathroom_id}
    newRate.user_id = req.user.id

        RatesService.getUserRateForBathroom(
        req.app.get('db'),
        req.user.id,
        bathroom_id
    )
    .then(rate => {
        console.log('rate', rate)
        if (rate.length === 0) {
            console.log('empty')
            RatesService.insertRate(
                req.app.get('db'),
                newRate
            )
                .then(rate => {
                    res 
                        .status(201)
                        .location(path.posix.join(req.originalUrl + `/${rate.id}`))
                        .json(serializeRate(rate))
                })
                .catch(next)
        }
        else {
            return res.status(400).json({
                error: {message: `User has already rated` }
            })
         }
        
    })
    .catch(next)
})

ratesRouter
    .route('/:rate_id')
    .all((req, res, next) => {
        RatesService.getById(
            req.app.get('db'),
            req.params.rate_id
        )
        .then(rate => {
            if (!rate) {
                return res.status(404).json({
                    error: { message: `Rate doesn't exist` }
                })
            }
            res.rate = rate 
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(RatesService.serializeRate(res.rate))
    })
    .delete((req, res, next) => {
        RatesService.deleteRate(
            req.app.get('db'),
            req.params.rate_id
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { rating} = req.body
        const rateToUpdate = {rating}

        const numberOfValues = Object.values(rateToUpdate).filter(Boolean).length
        if(numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain 'rating'`
                }
            })
        }
        RatesService.updateRate(
            req.app.get('db'),
            req.params.rate_id,
            rateToUpdate
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })

  module.exports = ratesRouter