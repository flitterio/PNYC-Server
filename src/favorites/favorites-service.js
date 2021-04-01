const FavoritesService = {
    
    getAllFavorites(knex) {
        return knex
            .select('*')
            .from('favorites')
    },
    getUserFavorites(knex, user_id){
        return knex
            .select('*')
            .from('favorites')
            .where('user_id', user_id)
    },

    getBathroomFavorites(knex, bathroom_id){
        return knex
            .select('*')
            .from('favorites')
            .where('bathroom_id', bathroom_id)
    },

    getById(knex, id) {
        return knex 
            .from('favorites')
            .select('*')
            .where('id', id)
            .first()
    }, 

    insertFavorite(knex, newFavorite) {
        return knex
            .insert(newFavorite)
            .into('favorites')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    deleteFavorite(knex, id) {
        return knex('favorites')
          .where({ id })
          .delete()
      },

      //NOT NECESSARY IF NO UPDATING POSSIBLE
    //   updateFavorite(knex, id, newFavoriteFields) {
    //     return knex('favorites')
    //       .where({ id })
    //       .update(newFavoriteFields)
    //   },
    serializeFavorite(favorite) {
        return {
        id: favorite.id,
        user_id: favorite.user_id,
        bathroom_id: favorite.bathroom_id
        }
    }
}

module.exports = FavoritesService