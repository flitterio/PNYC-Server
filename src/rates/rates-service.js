// const RatesService = {
//     getAllRates(knex) {
//         return knex
//             .select('*')
//             .from('rates')
//     },
//        insertRate(knex, newRate) {
//          return knex
//             .insert(newRate)
//             .into('rates')
//             .returning('*')
//             .then(rows => {
//                 return rows[0]
//             })
//        },
//        //might need to change this
//        getByBrId(knex, bathroom_id) {
//            return knex
//             .from('rates')
//             .select('*')
//             .where('bathroom_id', bathroom_id)
//          },

//         getById(knex, id) {
//             return knex
//                 .from('rates')
//                 .select('*')
//                 .where('id', id)
//                 .first()
//           },
         
//      deleteRate(knex, id) {
//                return knex('rates')
//                  .where({ id })
//                  .delete()
//              },
//     updateRate(knex, id, newRateFields) {
//                return knex('rates')
//                  .where({ id })
//                  .update(newRateFields)
//     },
// }

// module.exports = RatesService