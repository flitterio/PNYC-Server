function makeUsersArray() {
    return [
      {
        id: 1,
        date_created: '2029-01-22T16:28:32.615Z',
        fname: 'Sam',
        lname: 'Gamgee',
        username: 'sam.gamgee@shire.com',
        password: 'secret',
      },
      {
        id: 2,
        date_created: '2100-05-22T16:28:32.615Z',
        fname: 'Peregrin',
        lname: 'took',
        username: 'peregrin.took@shire.com',
        password: 'secret',
      },
      {
        id: 911,
        date_created: '2100-05-22T16:28:32.615Z',
        fname: 'Per',
        lname: 'to',
        username: 'peregrin',
        password: 'secret',
      }
    ]
  }
  
  module.exports = {
    makeUsersArray
  }