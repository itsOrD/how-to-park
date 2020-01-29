# how-to-park

GPS parking app powered by community.
Create a user account, or login as a guest, and see a live interactive map of parking spots available near you!
Once you've successfully parked, update and share real-time information with other users.


## Start Here

To run how-to-park you'll need to...

*Optional pre-req:
  In order to save parking info updates you'll want Mongo running locally with a root user*

First:
```
  fork this repo
  clone locally
```

Then *(in terminal)*:
```
  npm run build
  npm start
```


## Login

Navigate to:
```
  localhost:1111
```

Then...
 * "create" a username
 * enter a password
 * click "Create Account"
 
*Or...*
  * click "Guest Login"


## Use the App

Now that you're logged in you can interact with the map and leave new 
*Note: location sharing is currently not enabled, but it can be toggled in the myMap.jsx component)*

#### The map
The map is a stylized Leaflet.js component with typical interactie capabilities.  
Pinch or click to zoom in or out.
Click and pull or drag finger to move.

### The spot-finder-form:
Fill out all required components and hit "Save" to submit.
If you mess up, or park somewhere different just hit "Reset" and fill out the form again, no worries.


## Built With
 * ReactJS (ES6+ && hooks)
 * Grommet
 * Mongo/Mongoose
 * Express.js
 * Node.js
 * Webpack/Babel

 - - - 

## Project Roadmap 
This is a MVP, concieved and produced in less than 48 hours.  Once funcionality is improved, incljuding intrgrating oAuth and location sharing future system design plans include: 
 * create a Kubernetes pod
 * deploy on Microsoft Azure
 * persist data with Azure hosted Cassandra cluster
 * split out to micro-services
 * deploy with load-balancers
 * beta-test
 * submit to Android App store
 

 - - - 


### Author
 * Matthew Beckerleg - [github.com/itsOrD](github.com/itsOrD)
 
### License
 * This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
 
