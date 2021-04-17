# PNYC SERVER

Check out the front end at https://github.com/flitterio/PNYC-Client

Live Version: https://pnyc-client-flitterio.vercel.app/

## Endpoints 

### Authorization 
POST /api/auth/singin : Authorizes User Sign In with JWT Authentication 

POST /api/auth/refresh : Refreshes the page after period of time to keep user logged in

### Bathrooms 
GET /api/bathrooms : Gets all bathrooms

POST /api/bathrooms (protected endpoint) : Adds new bathroom to the database

GET /api/bathrooms/:bathroom_id : GEts all the information about a specific bathroom including average ratings and number of favorites 

DELETE /api/bathrooms/:bathroom_id (protected endpoint) : Deletes Bathroom

GET /api/bathrooms/:bathroom_id/rates : Gets all the rates for a bathroom

GET /api/bathrooms/:bathroom_id/comments : Gets all the comments for a bathroom



### Users (Protected Endpoints)
POST api/users : Creates a New User

GET api/users/:userId : Gets a User's information 

DELETE api/users/:userId : Deletes a User

PATCH api/ users/:userId : 


