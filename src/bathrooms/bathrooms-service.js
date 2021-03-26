const xss = require('xss')

const BathroomsService = {
    getAllBathrooms(knex) {
        //return knex
            // .select('*')
            // .from('bathrooms')
        return knex.raw(
            `select row_to_json(br) as bathrooms
            from(
              select br.id, br.br_name, br.lat, br.lng, br.description, br.category, br.user_id,
              (select json_agg(t)
              from (
                select * from tags where bathroom_id = br.id
              ) t
            ) as tags
            from bathrooms as br) br;`
        )
            
    },
    
       insertBathroom(db, newBathroom) {
         return db
            .insert(newBathroom)
            .into('bathrooms')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
       },
       getById(db, id) {
           return db
            .from('bathrooms')
            .select('*')
            .where('id', id)
            .first()
         },
         
     deleteBathroom(knex, id) {
               return knex('bathrooms')
                 .where({ id })
                 .delete()
     },
        updateBathroom(knex, id, newBathroomFields) {
               return knex('bathrooms')
                 .where({ id })
                 .update(newBathroomFields)
             },
    

    serializeBathroom(bathroom) {
        // const tags = this.getTags( bathroom.id)
        return{
            id: bathroom.id,
            br_name: xss(bathroom.br_name),
            lat: bathroom.lat,
            lng: bathroom.lng,
            description: xss(bathroom.description),
            creator: bathroom.user_id,
            category: bathroom.category,
            // number_of_favorites: Number(bathroom.number_of_favorites) || 0,
            // rates: {
            //     id: rates.id,
            //     bathroom_id: rates.bathroom_id,
            //     rate_category: rates.rate_category,
            //     rating: rates.rating,
            //     user_rate: rates.user_id
            // },
            // tags: {
            //     id: tags.id,
            //     tag: tags.tag
            // },
        }
    },
}

module.exports = BathroomsService