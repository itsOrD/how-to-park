# How To Park Modernization Roadmap

This document captures known issues and modernization tasks for the project.
Each TODO section includes a Codex prompt so that follow-up agents can take
specific actions.

## Current Issues
- Application fails to start because MongoDB is not running.
- Build script uses webpack in watch mode which does not exit.
- `SpotForm.jsx` imports `post` from `axios` which is invalid.
- Dependencies are outdated (React 16, Babel 7.7, etc.).
- No tests or linting in place.
- Configuration values (e.g., Mongo connection string) are hard coded.
- CircleCI config references Node 7 which is EOL.

## TODOs

### 1. Fix Axios import bug
```
In `client/src/components/sidebar/SpotForm.jsx` replace the named import of
`post` from `axios` with a default import. Use `axios.post('/data', value)` in
the `save` function. Verify webpack builds without warnings.
```

### 2. Add non-watch build script
```
Create an npm script `build:prod` that runs `webpack --mode production` without
the `--watch` flag. Update documentation to use this script when creating a
production bundle.
```

### 3. Update dependencies
```
Upgrade the project to use Node 18, React 18, and the latest versions of all
related packages (grommet, webpack, babel, etc.). Adjust code as needed for
compatibility.
```

### 4. Dockerize development environment
```
Provide a Dockerfile and docker-compose setup that runs Node and MongoDB for
local development. Expose the web app on port 1111.
```

### 5. Introduce environment variables
```
Use `dotenv` to read configuration such as MongoDB connection URL and server
port. Update the server to load these values from `.env`.
```

### 6. Implement authentication
```
Add real user authentication using Passport.js or a similar library. Replace the
placeholder login form so that users can create accounts and log in securely.
```

### 7. Add unit tests and linting
```
Set up Jest and React Testing Library for client tests and supertest for server
routes. Add ESLint and Prettier for consistent code style.
```

### 8. Update CircleCI configuration
```
Update `.circleci/config.yml` to use a modern Node image (e.g., node:18) and to
run the new test script. Ensure the configuration installs dependencies with
npm rather than yarn if yarn is not used.
```

### 9. Improve map features
```
Enable geolocation so the map centers on the user's current position (with
permission). Fetch saved parking spots from the server and display them via
`MapMarkings`.
```

### 10. Documentation & screenshots
```
Update README with fresh screenshots or gifs showing the login flow and map
interaction. Document how to run the Docker environment and any new commands.
```
