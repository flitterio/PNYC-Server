const xss = require('xss')
const RatesService = require('../rates/rates-service')

const BathroomsService = {
    getAllBathrooms(db) {
        return db
        .from('bathrooms')
        .select('*')
        // return db
        //     .from('bathrooms AS bath')
        //     .select('*',
        //  // ADDS NUMBER OF COMMENTS
        //   db.raw(
        //     `count(DISTINCT fav) AS number_of_favorites`
        //   ),
        // )
        //   //ADDS AUTHOR INFO
        //   db.raw(
        //     `json_strip_nulls(
        //       json_build_object(
        //         'id', usr.id,
        //         'user_name', usr.user_name,
        //         'full_name', usr.full_name,
        //         'nickname', usr.nickname,
        //         'date_created', usr.date_created,
        //         'date_modified', usr.date_modified
        //       )
        //     ) AS "author"`
        //   ),
         //)
        //adds the info to the articles table
        
        //  .leftJoin(
        //   'favorites AS fav',
        //   'bath.id',
        //   'fav.bathroom_id',
        // )
        // .leftJoin(
        //   'blogful_users AS usr',
        //   'art.author_id',
        //   'usr.id',
        // )
        // .groupBy('bath.id', 'bath.br_name', 'bath.lat', 'bath.lng', 'bath.description', 'bath.user_id', 'bath.category', 'bath.ishandicap', 'bath.isfamily', 'bath.hasstalls', 'bath.isprivate', 'bath.gender_neutral', 'bath.hasbaby_table', 'fav.id', 'fav.bathroom_id', 'fav.user_id')
        
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

     getCommentsForBathroom(db, bathroom_id) {
        return db
          .from('comments AS comm')
          .select(
            'comm.id',
            'comm.text',
            'comm.date_commented',
            db.raw(
              `json_strip_nulls(
                row_to_json(
                  (SELECT tmp FROM (
                    SELECT
                      usr.id,
                      usr.username,
                      usr.fname,
                      usr.lname,
                      usr.date_created
                  ) tmp)
                )
              ) AS "user"`
            )
          )
          .where('comm.bathroom_id', bathroom_id)
          .leftJoin(
            'users AS usr',
            'comm.user_id',
            'usr.id',
          )
          .groupBy('comm.id', 'usr.id')
      },
        // update only possible by administration, too messy to give users ability to update themselves
        // updateBathroom(knex, id, newBathroomFields) {
        //        return knex('bathrooms')
        //          .where({ id })
        //          .update(newBathroomFields)
        //      },
    
    //   bathroomRate(bathroom_id) {
    //     RatesService.getByBrId(
    //         req.app.get('db'),
    //         bathroom_id
    //     )
    //     .then(rates => {
    //         // const ratesArr = rates.map(RatesService.serializeRate)
    //         let ratings = rates.map(r => r.rating)
    //         console.log('rates', ratings)
    //         const reducer = (accumulator, currentValue) => accumulator + currentValue;
    //         const rating = (ratings.reduce(reducer)) / ratings.length
            
            // res.json(rates.map(RatesService.serializeRate))
            // console.log('post function', rating)
            // bathroomInfo['rate'] = rating
            // res.bathroom = bathroomInfo
            // next()
    //         return rating
    //     })
    //     // .catch(next)
    //   },

    serializeBathroom(bathroom) {
        // const tags = this.getTags( bathroom.id)
        return{
            id: bathroom.id,
            br_name: xss(bathroom.br_name),
            lat: parseFloat(bathroom.lat),
            lng: parseFloat(bathroom.lng),
            description: xss(bathroom.description),
            user_id: bathroom.user_id,
            category: bathroom.category,
            ishandicap: bathroom.ishandicap,
            isfamily: bathroom.isfamily,
            hasstalls: bathroom.hasstalls,
            isprivate: bathroom.isprivate,
            gender_neutral: bathroom.gender_neutral,
            hasbaby_table: bathroom.hasbaby_table,
            rate: bathroom.rate,
            favorites: bathroom.favorites,
            //number_of_favorites: Number(bathroom.number_of_favorites) || 0,
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

serializeComment(comment) {
        const { user } = comment
        return {
            id: comment.id,
            bathroom_id: comment.bathroom_id,
            text: xss(comment.text),
            date_commented: new Date(comment.date_commented),
            user: {
                id: user.id,
                username: user.username,
                fname: user.fname,
                lname: user.lname,
                date_created: new Date(user.date_created),
            },
        }
    },
}

module.exports = BathroomsService