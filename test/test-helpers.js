const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'test-user-1',
      fname: 'Test user 1',
      lname: 'User',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 2,
      username: 'test-user-2',
      fname: 'Test user 2',
      lname: 'User',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 3,
      username: 'test-user-3',
      fname: 'Test user 3',
      lname: 'User',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 4,
      username: 'test-user-4',
      fname: 'Test user 4',
      lname: 'User',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
  ]
}

function makeBathroomsArray() {
    return [
        {
            id: 'QXJjaWxsYSBQbGF5Z3JvdW5k',
            br_name: 'Arcilla Playground',
            lat: "40.663930",
            lng: "-73.938274", 
            description: 'playground', 
            user_id: 1,
            category: 'preloaded'
        },
        {
            id: 'faijsdfilok',
            br_name: 'Playground',
            lat: "40.663778",
            lng: "-73.938909", 
            description: '', 
            user_id: 1,
            category: 'preloaded'
        },
        {
            id: 'houet',
            br_name: 'test',
            lat: "40.724884",
            lng: "-73.820915", 
            description: 'test', 
            user_id: 1,
            category: 'preloaded'
        },
        {
            id: 'duwlsof',
            br_name: 'testing',
            lat: "40.75524628508683",
            lng: "-73.97035608857422", 
            description: 'test', 
            user_id: 1,
            category: 'preloaded'
        }
    ];
}

function makeRatesArray(){[
    {
        id: 1,
        bathroom_id: 'faijsdfilok',
        rate_category: 'Overall',
        rating: '3',
        user_id: 1,
    },
    {
        id: 2,
        bathroom_id: 'faijsdfilok',
        rate_category: 'Cleanliness',
        rating: '2',
        user_id: 1,
    },
    {
        id: 1,
        bathroom_id: 'faijsdfilok',
        rate_category: 'Privacy',
        rating: '4',
        user_id: 1,
    },

]}

function makeFavoritesArray(){[
    {
        id: 1,
        bathroom_id: 'QXJjaWxsYSBQbGF5Z3JvdW5k',
        user_id: 1
    },
    {
        id: 2,
        bathroom_id: 'QXJjaWxsYSBQbGF5Z3JvdW5k',
        user_id: 2
    }
]}

function makeTagsArray(){[
    {
        id: 1,
        bathroom_id: 'QXJjaWxsYSBQbGF5Z3JvdW5k',
        tag:'Handicap'
    },
    {
        id: 2,
        bathroom_id: 'faijsdfilok',
        tag:'Family'
    }

]}

// function makeCommentsArray(users, bathrooms) {
//   return [
//     {
//       id: 1,
//       text: 'First test comment!',
//       bathroom_id: ,
//       user_id: users[0].id,
//       date_created: new Date('2029-01-22T16:28:32.615Z'),
//     },
//     {
//       id: 2,
//       text: 'Second test comment!',
//       bathroom_id: bathrooms[0].id,
//       user_id: users[1].id,
//       date_created: new Date('2029-01-22T16:28:32.615Z'),
//     },
//     {
//       id: 3,
//       text: 'Third test comment!',
//       bathroom_id: bathrooms[0].id,
//       user_id: users[2].id,
//       date_created: new Date('2029-01-22T16:28:32.615Z'),
//     },
//     {
//       id: 4,
//       text: 'Fourth test comment!',
//       bathroom_id: bathrooms[0].id,
//       user_id: users[3].id,
//       date_created: new Date('2029-01-22T16:28:32.615Z'),
//     },
//     {
//       id: 5,
//       text: 'Fifth test comment!',
//       bathroom_id: bathrooms[bathrooms.length - 1].id,
//       user_id: users[0].id,
//       date_created: new Date('2029-01-22T16:28:32.615Z'),
//     },
//     {
//       id: 6,
//       text: 'Sixth test comment!',
//       bathroom_id: bathrooms[bathrooms.length - 1].id,
//       user_id: users[2].id,
//       date_created: new Date('2029-01-22T16:28:32.615Z'),
//     },
//     {
//       id: 7,
//       text: 'Seventh test comment!',
//       bathroom_id: bathrooms[3].id,
//       user_id: users[0].id,
//       date_created: new Date('2029-01-22T16:28:32.615Z'),
//     },
//   ];
// }

// function makeExpectedBathroom(users, bathroom, comments=[]) {
//   const author = users
//     .find(user => user.id === bathroom.author_id)

//   const number_of_comments = comments
//     .filter(comment => comment.bathroom_id === bathroom.id)
//     .length

//   return {
//     id: bathroom.id,
//     style: bathroom.style,
//     title: bathroom.title,
//     content: bathroom.content,
//     date_created: bathroom.date_created.toISOString(),
//     number_of_comments,
//     author: {
//       id: author.id,
//       username: author.username,
//       fname: author.fname,
//       nickname: author.nickname,
//       date_created: author.date_created.toISOString(),
//       date_modified: author.date_modified || null,
//     },
//   }
// }

// function makeExpectedbathroomComments(users, bathroomId, comments) {
//   const expectedComments = comments
//     .filter(comment => comment.bathroom_id === bathroomId)

//   return expectedComments.map(comment => {
//     const commentUser = users.find(user => user.id === comment.user_id)
//     return {
//       id: comment.id,
//       text: comment.text,
//       date_created: comment.date_created.toISOString(),
//       user: {
//         id: commentUser.id,
//         username: commentUser.username,
//         fname: commentUser.fname,
//         nickname: commentUser.nickname,
//         date_created: commentUser.date_created.toISOString(),
//         date_modified: commentUser.date_modified || null,
//       }
//     }
//   })
// }

// function makeMaliciousbathroom(user) {
//   const maliciousbathroom = {
//     id: 911,
//     style: 'How-to',
//     date_created: new Date(),
//     title: 'Naughty naughty very naughty <script>alert("xss");</script>',
//     author_id: user.id,
//     content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
//   }
//   const expectedbathroom = {
//     ...makeExpectedbathroom([user], maliciousbathroom),
//     title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
//     content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
//   }
//   return {
//     maliciousbathroom,
//     expectedbathroom,
//   }
// }

// function makebathroomsFixtures() {
//   const testUsers = makeUsersArray()
//   const testbathrooms = makebathroomsArray(testUsers)
//   const testComments = makeCommentsArray(testUsers, testbathrooms)
//   return { testUsers, testArticles, testComments }
// }

// function cleanTables(db) {
//   return db.transaction(trx =>
//     trx.raw(
//       `TRUNCATE
//         blogful_articles,
//         blogful_users,
//         blogful_comments
//       `
//     )
//     .then(() =>
//       Promise.all([
//         trx.raw(`ALTER SEQUENCE blogful_articles_id_seq minvalue 0 START WITH 1`),
//         trx.raw(`ALTER SEQUENCE blogful_users_id_seq minvalue 0 START WITH 1`),
//         trx.raw(`ALTER SEQUENCE blogful_comments_id_seq minvalue 0 START WITH 1`),
//         trx.raw(`SELECT setval('blogful_articles_id_seq', 0)`),
//         trx.raw(`SELECT setval('blogful_users_id_seq', 0)`),
//         trx.raw(`SELECT setval('blogful_comments_id_seq', 0)`),
//       ])
//     )
//   )
// }

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('blogful_users').insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('blogful_users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}

// function seedBathroomTables(db, users, bathrooms, comments=[]) {
//   // use a transaction to group the queries and auto rollback on any failure
//   return db.transaction(async trx => {
//     await seedUsers(trx, users)
//     await trx.into('blogful_articles').insert(articles)
//     // update the auto sequence to match the forced id values
//     await trx.raw(
//       `SELECT setval('blogful_articles_id_seq', ?)`,
//       [articles[articles.length - 1].id],
//     )
//     // only insert comments if there are some, also update the sequence counter
//     if (comments.length) {
//       await trx.into('blogful_comments').insert(comments)
//       await trx.raw(
//         `SELECT setval('blogful_comments_id_seq', ?)`,
//         [comments[comments.length - 1].id],
//       )
//     }
//   })
// }

// function seedMaliciousArticle(db, user, article) {
//   return seedUsers(db, [user])
//     .then(() =>
//       db
//         .into('blogful_articles')
//         .insert([article])
//     )
// }

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeBathroomsArray,
//   makeExpectedArticle,
//   makeExpectedArticleComments,
//   makeMaliciousArticle,
//   makeCommentsArray,

//   makeArticlesFixtures,
//   cleanTables,
//   seedArticlesTables,
//   seedMaliciousArticle,
  makeAuthHeader,
  seedUsers,
}
