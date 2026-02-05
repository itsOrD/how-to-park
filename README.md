# How To Park

GPS parking app powered by community.
Create a user account, or login as a guest, and see a live interactive map of parking spots available near you!
Once you've successfully parked, update and share real-time information with other users.

![](./demoGifs/howToPark_guestLogin.gif)

## Features

- **Interactive Leaflet Map**: Black and white OpenStreetMap tiles with zoom and pan controls
- **Geolocation Support**: Map automatically centers on your location (with Seattle fallback)
- **Parking Spot Submission**: Share parking information via the side-panel form
- **Responsive Design**: Clean, mobile-friendly interface built with Grommet UI
- **Comprehensive Testing**: Full unit and E2E test coverage with Jest and Playwright

## Start Here

To run how-to-park you'll need to...

*Optional pre-req:
  In order to save parking info updates you'll want Mongo running locally with a root user*

**First:**
```
  fork this repo
  clone locally
  npm install
```

**Then** *(in separate terminal tabs)***:**
```
  npm run build
  npm start
```

*Note: The app will run without MongoDB - database errors are handled gracefully.*


## Login

**Navigate to:**
```
  localhost:1111
```

**Then...**
 * "create" a username
 * enter a password
 * click "Create Account"
 
![](./demoGifs/howToPark_userLogin.gif)

*Or...*
  * click "Guest Login"


## Use the App

Now that you're logged in you can interact with the map and leave new parking spot information.

#### The Map

![](./demoGifs/howToPark_mapInteraction.gif)

The map is a Leaflet.js component using OpenStreetMap tiles with interactive capabilities:
- **Geolocation**: Automatically centers on your location (permission required)
- **Zoom**: Use + and - buttons or pinch/scroll to zoom
- **Pan**: Click and drag or swipe to move around the map
- **Responsive**: Full-width layout that adapts to your screen

**Map Details:**
- Tiles: OpenStreetMap (black and white style)
- Default center: Seattle, WA (47.598920, -122.333730)
- Zoom level: 11
- Real-time geolocation support with fallback

#### The spot finder form (side-panel):

![](./demoGifs/howToPark_fillOutUserForm.gif)

Fill out all required components and hit "Save" to submit.
If you mess up, or park somewhere different just hit "Reset" and fill out the form again, no worries.

![](./demoGifs/howToPark_formReset.gif)

 - - -

## Testing

This project includes comprehensive test coverage with both unit and E2E tests.

**Run all tests:**
```bash
npm test
```

**Run unit tests:**
```bash
npm run test:unit
```

**Run E2E tests:**
```bash
npm run test:e2e
```

For detailed testing documentation, see [TESTING.md](TESTING.md).

 - - -

## Built With
 * **ReactJS** (ES6+ with hooks)
 * **Leaflet.js** - Interactive mapping library
 * **OpenStreetMap** - Map tile provider
 * **Grommet** - React component library for UI
 * **MongoDB/Mongoose** - Database (optional)
 * **Express.js** - Web server
 * **Node.js** - Runtime environment
 * **Webpack/Babel** - Build tools
 * **Jest & React Testing Library** - Unit testing
 * **Playwright** - E2E testing

 - - - 

## Recent Updates

### Map Rendering Fix (Feb 2026)
- Fixed Leaflet CSS loading (now bundled locally)
- Switched to OpenStreetMap tiles for reliability
- Added geolocation support with automatic centering
- Improved map styling and responsiveness
- Enhanced error handling (MongoDB connection failures)
- Comprehensive test coverage (unit + E2E)

For detailed information, see [MAP_FIX_SUMMARY.md](MAP_FIX_SUMMARY.md).

 - - - 

## Project Roadmap 
This is an MVP, conceived and produced in less than 48 hours. Once functionality is improved, including integrating oAuth and location sharing future system design plans include:
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
 
