const FavoritesService = {
    getAllFavorites(knex) {
        return knex
            .select('*')
            .from('favorites')
    },

    getById(knex, id) {
        return knex 
            .from('favorites')
            .select('*')
            .where('id', id)
            .first()
    }, 

    insertItem(knex, newItem) {
        return knex
            .insert(newItem)
            .into('favorites')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    deleteItem(knex, id) {
        return knex('favorites')
          .where({ id })
          .delete()
      },

      //NOT NECESSARY IF NO UPDATING POSSIBLE
    //   updateItem(knex, id, newItemFields) {
    //     return knex('favorites')
    //       .where({ id })
    //       .update(newItemFields)
    //   },
}

module.exports = FavoritesService