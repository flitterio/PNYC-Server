//DELETED THE TAGS TABLE


// const path = require('path')
// const express = require('express')
// const TagsService = require('./tags-service')

// const tagsRouter = express.Router()
// const jsonParser = express.json()

// const serializeTag = tag => ({
//     id: tag.id,
//     bathroom_id: tag.bathroom_id,
//     tag: tag.tag,
// })

// tagsRouter
//     .route('/')
//     //HOW DO I GET THE ASSOCIATED BATHROOM'S TAGS, WHERE DO I GET THE ID OF THE BATHROOM
//     .get((req, res, next) => {
//         const knexInstance = req.app.get('db')
//         TagsService.getByBrId(knexInstance, req.bathroom_id)
//         .then(tags => {
//             res.json(tags.map(serializeTag))
//         })
//         .catch(next)
//   })
//   .delete((req, res, next) => {
//     TagsService.deleteTag(
//         req.app.get('db'),
//         req.params.tag_id
//     )
//     .then(() => {
//         res.status(204).end()
//     })
//     .catch(next)
//   })

// .post(jsonParser, (req, res, next) => {
//     const{tag, bathroom_id } = req.body
//     const newTag = { tag, bathroom_id }

//     for(const [key, value] of Object.entries(newTag)) {
//         if (value == null) {
//             return res.status(400).json({
//                 error: {message: `Missing '${key}' in request body` }
//             })
//         }
//     }

//     TagsService.insertTag(
//         req.app.get('db'),
//         newTag
//     )

//         .then(tag => {
//             res 
//                 .status(201)
//                 .location(path.posix.join(req.originalUrl + `/${tag.id}`))
//                 .json(serializeTag(tag))
//         })
//         .catch(next)
//     })

// tagsRouter
//     .route('/:tag_id')
//     .all((req, res, next) => {
//         TagsService.getById(
//             req.app.get('db'),
//             req.params.tag_id
//         )
//         .then(tag => {
//             if (!tag) {
//                 return res.status(404).json({
//                     error: { message: `Tag doesn't exist` }
//                 })
//             }
//             res.tag = tag 
//             next()
//         })
//         .catch(next)
//     })
//     .get((req, res, next) => {
//         res.json(serializeTag(res.tag))
//     })
//     .delete((req, res, next) => {
//         TagsService.deleteTag(
//             req.app.get('db'),
//             req.params.tag_id
//         )
//         .then(numRowsAffected => {
//             res.status(204).end()
//         })
//         .catch(next)
//     })


//   module.exports = tagsRouter