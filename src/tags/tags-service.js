//DELETED TAGS TABLE


// const TagsService = {
//     getAllTags(knex) {
//         return knex.select('*').from('tags')
//     },
//     getBrTags(knex, bathroom_id){
//         return knex
//             .from('tags')
//             .select('*')
//             .where('bathroom_id', bathroom_id)
//     },
//        insertTag(knex, newTag) {
//          return knex
//             .insert(newTag)
//             .into('tags')
//             .returning('*')
//             .then(rows => {
//                 return rows[0]
//             })
//        },
//        //unsre if this is the correct move... maybe I should make another endpoint specifically to get rates, comments, and tags?
//        getByBrId(knex, bathroom_id) {
//            return knex
//             .from('tags')
//             .select('*')
//             .where('bathroom_id', bathroom_id)
//          },

//         getById(knex, id) {
//             return knex
//                 .from('tags')
//                 .select('*')
//                 .where('id', id)
//                 .first()
//           },
         
//      deleteTag(knex, id) {
//                return knex('tags')
//                  .where({ id })
//                  .delete()
//              },
// //wouldn't need to update, just add or delete the tag
//         // updateTag(knex, id, newTagFields) {
//         //        return knex('tags')
//         //          .where({ id })
//         //          .update(newTagFields)
//         //      },
//     }

// module.exports = TagsService