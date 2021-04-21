# PNYC SERVER

Check out the front end Repo at https://github.com/flitterio/PNYC-Client

Live Version: https://pnyc-client-flitterio.vercel.app/

# Endpoints 

## Authorization 
### POST /api/auth/singin : Authorizes User Sign In with JWT Authentication 

**Data constraints**

```json
{
    "username": "[valid username]",
    "password": "[password in plain text]"
}
```

**Data example**

```json
{
    "username": "username",
    "password": "Password123!"
}
```

#### Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "authToken": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```

 ### POST /api/auth/refresh : Refreshes the page after period of time to keep user logged in
#### Success Response

**Code** : `200 OK`
**Content example**

```json
{
    "authToken": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```
 

## Bathrooms 
### GET /api/bathrooms : Gets all bathrooms
#### Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "id": "wieorn",
        "br_name": "test add",
        "lat": 40.785091,
        "lng": -73.968285,
        "description": "Bathroom",
        "user_id": 4,
        "category": "preloaded",
        "ishandicap": false,
        "isfamily": false,
        "hasstalls": false,
        "isprivate": false,
        "gender_neutral": false,
        "hasbaby_table": false,
        "rate": 0
    },
    {
        "id": "pYQErV",
        "br_name": "Arcilla Playground",
        "lat": 40.829958,
        "lng": -73.912109,
        "description": "Public Bathroom",
        "user_id": 0,
        "category": "preloaded",
        "ishandicap": false,
        "isfamily": false,
        "hasstalls": false,
        "isprivate": false,
        "gender_neutral": false,
        "hasbaby_table": false,
        "rate": 0
    }
   
  ]
```


### POST /api/bathrooms (Requires AuthToken) : Adds new bathroom to the database

**Data constraints**

```json
{
    "id": "[hashid converted on front end from lat]",
    "br_name": "[name of bathroom]",
    "lat": [latitude],
    "lng": [longitude],
    "description": "[Optional description of bathroom, default is 'Bathroom']",
    "user_id": [user id],
    "category": "['preloaded' or 'user_added']",
    "ishandicap": [false],
    "isfamily": [false],
    "hasstalls": [false],
    "isprivate": [false],
    "gender_neutral": [ false],
    "hasbaby_table": [false],
    "rate": [average ratings for bathroom]
}
```

**Data example**

```json
{
    "id": "vioeWL",
    "br_name": "The Graham",
    "lat": 40.708146,
    "lng": -73.943182,
    "description": "Restaurant/ Bar that has to go options that you can buy to use bathroom",
    "user_id": 1,
    "category": "user_added",
    "ishandicap": false,
    "isfamily": false,
    "hasstalls": false,
    "isprivate": true,
    "gender_neutral": true,
    "hasbaby_table": false,
    "rate": 0
}
```

#### Success Response

**Code** : `201 Created`

**Content example**

```json
{
    "id": "vioeWL",
    "br_name": "The Graham",
    "lat": 40.708146,
    "lng": -73.943182,
    "description": "Restaurant/ Bar that has to go options that you can buy to use bathroom",
    "user_id": 1,
    "category": "user_added",
    "ishandicap": false,
    "isfamily": false,
    "hasstalls": false,
    "isprivate": true,
    "gender_neutral": true,
    "hasbaby_table": false,
    "rate": 0
}
```


### GET /api/bathrooms/:bathroom_id : GEts all the information about a specific bathroom including average ratings 

#### Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "id": "vioeWL",
    "br_name": "The Graham",
    "lat": 40.708146,
    "lng": -73.943182,
    "description": "Restaurant/ Bar that has to go options that you can buy to use bathroom",
    "user_id": 1,
    "category": "user_added",
    "ishandicap": false,
    "isfamily": false,
    "hasstalls": false,
    "isprivate": true,
    "gender_neutral": true,
    "hasbaby_table": false,
    "rate": 0
}
```


### DELETE /api/bathrooms/:bathroom_id (Protected Endpoint, AuthToken Required) : Deletes Bathroom
#### Success Response

**Code** : `204 No Content`

**Content example**

```json
1
```

### GET /api/bathrooms/:bathroom_id/rates : Gets all the rates for a bathroom

#### Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "id": 7,
        "bathroom_id": "qxYNLr",
        "rating": 5,
        "user_id": 2
    }
]
```


### GET /api/bathrooms/:bathroom_id/comments : Gets all the comments for a bathroom

#### Success Response

**Code** : `200 OK`

**Content example**

```json
[
      {
        "id": 44,
        "text": "Always reliable. Lots of stalls, usually pretty clean",
        "date_commented": "2021-04-16T04:24:37.016Z",
        "user": {
            "id": 2,
            "username": "flitterio",
            "fname": "Francesca",
            "lname": "Litterio",
            "date_created": "2021-04-07T17:51:27.039Z"
        }
    },
    {
        "id": 45,
        "text": "Love this place",
        "date_commented": "2021-04-16T19:57:28.399Z",
        "user": {
            "id": 2,
            "username": "flitterio",
            "fname": "Francesca",
            "lname": "Litterio",
            "date_created": "2021-04-07T17:51:27.039Z"
        }
    }
]
```


## Users (Protected Endpoints, AuthToken Required)
### POST api/users : Creates a New User

**Data constraints**

```json
{
    "username": "[valid username]",
    "fname" : "[user's first name]",
    "lname" : "[user's last name]",
    "password": "[password in plain text]"
}
```

**Data example**

```json
{
    "username": "username",
    "fname" : "user",
    "lname" : "name",
    "password": "Password123!"
}
```

#### Success Response

**Code** : `201 Created`

**Content example**

```json
{  
    "id": 39,
    "fname": "user",
    "lname": "name",
    "username": "username",
    "password": "$2a$12$EyO6Njxq2SY7LUEBahHRLuIjz9rlPgjP9CMRCvNFpXcLpzulaEri.",
    "date_created": "2021-04-21T20:31:49.384Z"
}
```

### GET api/users : Gets a User's information 

#### Success Response

**Code** : `200 OK`

**Content example**

```json
[
   "id": 1,
    "fname": "user",
    "lname": "one",
    "username": "exampleuser",
    "password": "$2a$12$hexm1Td1j6RnyBBZMKI0fOFQ/ueCONJjJrfG2UlLNw2e6Nrv4Dk06",
    "date_created": "2021-04-03T17:50:30.811Z",
    "favorites": []
]
```

### DELETE api/users/:userId : Deletes a User

#### Success Response

**Code** : `204 No Content`

**Content example**

```json
1
```
### GET api/ users/:userId/rates : gets all of the rates from a user
#### Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "id": 1,
        "bathroom_id": "wieorn",
        "rating": 5,
        "user_id": 1
    }
]
```

## Rates 

### GET api/rates : Gets all rates
**Code** : `200 OK`

**Content example**

```json
[
     {
        "id": 1,
        "bathroom_id": "wieorn",
        "rating": 5,
        "user_id": 1
    },
    {
        "id": 7,
        "bathroom_id": "qxYNLr",
        "rating": 5,
        "user_id": 2
    },
    {
        "id": 8,
        "bathroom_id": "Nk93j6",
        "rating": 3,
        "user_id": 2
    }
]
```


### POST api/rates (protected endpoint) : Add new rating

**Data constraints**

```json
{
    "bathroom_id": "[valid bathroom id]",
    "rating": [1-5]
}
```

**Data example**

```json
{
    "bathroom_id": "lokEpF",
    "rating": "4"
}
```

#### Success Response

**Code** : `201 Created`

**Content example**

```json
{
    "id": 9,
    "bathroom_id": "lokEpF",
    "rating": 4,
    "user_id": 1
}
```

### GET api/rates/:rate_id : Get specific rate

#### Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "id": 9,
    "bathroom_id": "lokEpF",
    "rating": 4,
    "user_id": 1
}
```

### DELETE api/rates/:rate_id : Delete a rating

#### Success Response

**Code** : `204 No Content`

**Content example**

```json
1
```


### PATCH api/rates/:rate_id : Edit a rating

**Data constraints**

```json
{
    "rating": [1-5]
}
```

**Data example**

```json
{
    "rating": "5"
}
```

#### Success Response

**Code** : `204 No Content`

**Content example**

```json
1
```




## Comments (Protected Endpoint)

### POST api/comments : Add a new comment

**Data constraints**

```json
{
    "bathroom_id": "[valid bathroom id]",
    "text": "[content of comment]"
}
```

**Data example**

```json
{
    "bathroom_id": "lokEpF",
    "text": "One of the bathrooms is huge, but the others are really small and dark"
}
```

#### Success Response

**Code** : `201 Created`

**Content example**

```json
{
    "id": 48,
    "text": "One of the bathrooms is huge, but the others are really small and dark",
    "bathroom_id": "lokEpF",
    "date_commented": "2021-04-21T20:29:51.295Z",
    "user": {
        "id": 1,
        "username": "exampleuser",
        "fname": "user",
        "lname": "one",
        "date_created": "2021-04-03T17:50:30.811Z"
    }
}
```


## Technologies Used To Develop

Node.js, PSQL, Heroku, PostgreSQL, DBeaver, Postman

