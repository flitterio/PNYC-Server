const xss = require('xss')

const CommentsService = {
  getById(db, id) {
    return db
      .from('comments AS comm')
      .select(
        'comm.id',
        'comm.text',
        'comm.date_created',
        'comm.bathroom_id',
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  usr.id,
                  usr.username,
                  usr.fname,
                  usr.lname,
                  usr.date_created,
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .leftJoin(
        'users AS usr',
        'comm.user_id',
        'usr.id',
      )
      .where('comm.id', id)
      .first()
  },

  insertComment(db, newComment) {
    return db
      .insert(newComment)
      .into('comments')
      .returning('*')
      .then(([comment]) => comment)
      .then(comment =>
        CommentsService.getById(db, comment.id)
      )
  },

  serializeComment(comment) {
    const { user } = comment
    return {
      id: comment.id,
      text: xss(comment.text),
      bathroom_id: comment.bathroom_id,
      date_created: new Date(comment.date_created),
      user: {
        id: user.id,
        username: user.username,
        fname: user.fname,
        lname: user.lname,
        date_created: new Date(user.date_created),
      },
    }
  }
}

module.exports = CommentsService
