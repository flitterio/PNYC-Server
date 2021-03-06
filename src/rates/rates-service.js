const RatesService = {
    getAllRates(knex) {
        return knex
            .select('*')
            .from('rates')
    },
       insertRate(knex, newRate) {
         return knex
            .insert(newRate)
            .into('rates')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
       },
       //might need to change this
       getByBrId(knex, bathroom_id) {
           return knex
            .from('rates')
            .select('*')
            .where('bathroom_id', bathroom_id)
         },

        getById(knex, id) {
            return knex
                .from('rates')
                .select('*')
                .where('id', id)
                .first()
          },
          getUserRates(knex, user_id){
              return knex   
                .from('rates')
                .select('*')
                .where('user_id', user_id)
          },

          getUserRateForBathroom(knex, user_id, bathroom_id){
              return knex
                .from('rates')
                .select('*')
                .where('bathroom_id', bathroom_id)
                .where('user_id', user_id)
          },
          //get user rating for bathroom
          //make sure to know what to return
         
     deleteRate(knex, id) {
               return knex('rates')
                 .where({ id })
                 .delete()
             },
    updateRate(knex, id, newRateFields) {
               return knex('rates')
                 .where({ id })
                 .update(newRateFields)
    },

    serializeRate(rate) {
        return {
            id: rate.id,
            bathroom_id: rate.bathroom_id,
            rate_category: rate.rate_category,
            rating: rate.rating,
            user_id: rate.user_id,
        }
    },
}

module.exports = RatesService