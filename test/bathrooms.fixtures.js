function makeBathroomsArray() {
    return [
        {
            id: 'QXJjaWxsYSBQbGF5Z3JvdW5k',
            br_name: 'Arcilla Playground',
            lat: 40.663930,
            lng: -73.938274,
            description: 'playground',
            user_id: 1,
            category: 'preloaded',
            ishandicap: false,
            isfamily: false,
            hasstalls: false,
            isprivate: false,
            gender_neutral: false,
            hasbaby_table: false,
            rate: 0
        },
        {
            id: 'faijsdfilok',
            br_name: 'Playground',
            lat: 40.663778,
            lng: -73.938909,
            description: '',
            user_id: 1,
            category: 'preloaded',
            ishandicap: false,
            isfamily: false,
            hasstalls: false,
            isprivate: false,
            gender_neutral: false,
            hasbaby_table: false,
            rate: 0
        },
    ];
}

function makeMaliciousBathroom() {
    const maliciousBathroom = {
        id: '911',
        br_name: 'Naughty naughty very naughty <script>alert("xss");</script>',
        lat: 40.6639307188879,
        lng: -73.9382749875207, 
        description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
        user_id: 911,
        category: 'user_added'
    }
    const expectedBathroom = {
        ...maliciousBathroom,
        br_name: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
        description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
      }
      return {
        maliciousBathroom,
        expectedBathroom,
      }
}

module.exports = {
    makeBathroomsArray,
    makeMaliciousBathroom,
  }