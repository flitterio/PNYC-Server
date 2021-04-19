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

// function makeFavoritesArray(){[
//     {
//         id: 1,
//         bathroom_id: 'QXJjaWxsYSBQbGF5Z3JvdW5k',
//         user_id: 1
//     },
//     {
//         id: 2,
//         bathroom_id: 'QXJjaWxsYSBQbGF5Z3JvdW5k',
//         user_id: 2
//     }
// ]}

// function makeTagsArray(){[
//     {
//         id: 1,
//         bathroom_id: 'QXJjaWxsYSBQbGF5Z3JvdW5k',
//         tag:'Handicap'
//     },
//     {
//         id: 2,
//         bathroom_id: 'faijsdfilok',
//         tag:'Family'
//     }

// ]}

function makeCommentsArray(users) {
  return [
    {
      id: 1,
      text: 'First test comment!',
      bathroom_id: 'QXJjaWxsYSBQbGF5Z3JvdW5k',
      user_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 2,
      text: 'Second test comment!',
      bathroom_id: 'faijsdfilok',
      user_id: users[1].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 3,
      text: 'Third test comment!',
      bathroom_id: 'QXJjaWxsYSBQbGF5Z3JvdW5k',
      user_id: users[2].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 4,
      text: 'Fourth test comment!',
      bathroom_id: 'QXJjaWxsYSBQbGF5Z3JvdW5k',
      user_id: users[3].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 5,
      text: 'Fifth test comment!',
      bathroom_id: 'faijsdfilok',
      user_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 6,
      text: 'Sixth test comment!',
      bathroom_id: 'faijsdfilok',
      user_id: users[2].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 7,
      text: 'Seventh test comment!',
      bathroom_id: 'faijsdfilok',
      user_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
  ];
}

function makeExpectedBathroom(bathroom) {
  return {
    id: bathroom.id,
    br_name: bathroom.br_name,
    lat: parseFloat(bathroom.lat),
    lng: parseFloat(bathroom.lng),
    description: bathroom.description,
    user_id: bathroom.user_id,
    category: bathroom.category,
    ishandicap: bathroom.ishandicap,
    isfamily: bathroom.isfamily,
    hasstalls: bathroom.hasstalls,
    isprivate: bathroom.isprivate,
    gender_neutral: bathroom.gender_neutral,
    hasbaby_table: bathroom.hasbaby_table,
    }
}

function makeExpectedbathroomComments(users, bathroomId, comments) {
  const expectedComments = comments
    .filter(comment => comment.bathroom_id === bathroomId)

  return expectedComments.map(comment => {
    const commentUser = users.find(user => user.id === comment.user_id)
    return {
      id: comment.id,
      text: comment.text,
      bathroom_id: comment.bathroom_id,
      date_commented: new Date(comment.date_commented),
      user: {
        id: commentUser.id,
        username: commentUser.username,
        fname: commentUser.fname,
        lname: commentUser.lname,
        date_created: new Date(user.date_created),
      }
    }
  })
}

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

function makeBathroomsFixtures() {
  const testUsers = makeUsersArray()
  const testBathrooms = makeBathroomsArray(testUsers)
  const testComments = makeCommentsArray(testUsers, testBathrooms)
  return { testUsers, testBathrooms, testComments }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        rates,
        comments,
        bathrooms,
        users
        RESTART IDENTITY CASCADE
      `
    )
    // .then(() =>
    //   Promise.all([
    //     trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
    //     trx.raw(`ALTER SEQUENCE comments_id_seq minvalue 0 START WITH 1`),
    //     trx.raw(`ALTER SEQUENCE rates_id_seq minvalue 0 START WITH 1`),
    //     trx.raw(`SELECT setval('users_id_seq', 0)`),
    //     trx.raw(`SELECT setval('comments_id_seq', 0)`),
    //     trx.raw(`SELECT setval('rates_id_seq', 0)`),
    //   ])
    // )
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('users').insert(preppedUsers)
    // .then(() =>
    //   // update the auto sequence to stay in sync
    //   db.raw(
    //     `SELECT setval('users_id_seq', ?)`,
    //     [users[users.length - 1].id],
    //   )
    // )
}

function seedBathroomsTables(db, users, bathrooms, comments=[]) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('bathrooms').insert(bathrooms)
    // update the auto sequence to match the forced id values
    // await trx.raw(
    //   `SELECT setval('blogful_articles_id_seq', ?)`,
    //   [articles[articles.length - 1].id],
    // )
    // only insert comments if there are some, also update the sequence counter
    if (comments.length) {
      await trx.into('comments').insert(comments)
      await trx.raw(
        `SELECT setval('comments_id_seq', ?)`,
        [comments[comments.length - 1].id],
      )
    }
  })
}

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
  makeExpectedBathroom,
  makeCommentsArray,
  makeRatesArray,
  seedBathroomsTables,
  makeBathroomsFixtures,
//   makeMaliciousArticle,
//   makeCommentsArray,

//   makeArticlesFixtures,
   cleanTables,
//   seedArticlesTables,
//   seedMaliciousArticle,
  makeAuthHeader,
  seedUsers,
}
