# How To Park — Project Roadmap

This document outlines modernization tasks, known issues, and the planned evolution of the **How To Park** application. The project is an MVP built in under 48 hours and has several clear areas for improvement before it is production-ready.

---

## Known Issues

| # | Area | Issue | Impact |
|---|------|--------|--------|
| 1 | Configuration | `PORT` and MongoDB URI are hardcoded in source files | Blocks deployment to different environments |
| 2 | Dependencies | `body-parser` is listed separately but is bundled with Express 4.16+ | Unnecessary dependency |
| 3 | Dependencies | `jquery` is listed as a runtime dependency but appears unused | Unnecessary bundle size |
| 4 | Security | No authentication/authorization beyond a simple username flow | Exposes data to any user |
| 5 | Database | No input validation or sanitization on saved parking data | Potential for bad data |
| 6 | Build | `npm run build` starts webpack in `--watch` mode, blocking CI | CI/CD pipelines must use `build:once` |
| 7 | Testing | E2E tests require a running server; no mock server or fixtures | Flaky in offline/CI environments |
| 8 | Ops | No Docker image or compose file | Hard to run consistently across machines |

---

## Modernization Tasks

### 1. Environment Variable Management ⭐ **(Highest Impact)**

**Goal:** Replace all hardcoded configuration values with environment variables so the app can be configured without code changes.

**Tasks:**
- [ ] Install `dotenv` and load it at the top of `server/index.js` and `db/index.js`
- [ ] Replace hardcoded `PORT = 1111` with `process.env.PORT || 1111`
- [ ] Replace hardcoded MongoDB URI `'mongodb://localhost/howtopark'` with `process.env.MONGODB_URI || 'mongodb://localhost/howtopark'`
- [ ] Create a `.env.example` file documenting all supported environment variables
- [ ] Add `.env` to `.gitignore` to prevent committing secrets

**Why it matters:** This is the foundation for Dockerization, cloud deployment, and CI/CD pipelines. All subsequent ops improvements depend on it.

---

### 2. Dockerization

**Goal:** Package the application in a container so it runs identically in development, staging, and production.

**Tasks:**
- [ ] Create a `Dockerfile` using a Node.js LTS base image
- [ ] Create a `docker-compose.yml` that starts both the app server and a MongoDB instance
- [ ] Add a `.dockerignore` file to exclude `node_modules`, build artifacts, and test results
- [ ] Document Docker usage in `README.md`

**Prompt for AI assistance:**
> "Create a production-ready multi-stage Dockerfile for a Node.js/React app that builds the Webpack bundle in a builder stage and copies only the dist output and server files into the final image. The app listens on a configurable PORT environment variable."

---

### 3. Dependency Audit and Cleanup

**Goal:** Remove unused packages, resolve security advisories, and keep dependency count minimal.

**Tasks:**
- [ ] Run `npm audit` and resolve all high/critical advisories
- [ ] Remove `jquery` from `dependencies` if it is unused
- [ ] Remove `body-parser` from `devDependencies` and use `express.json()` / `express.urlencoded()` directly
- [ ] Pin or review major-version ranges for runtime packages (`react`, `leaflet`, `grommet`)
- [ ] Add a `npm audit` step to CI

**Prompt for AI assistance:**
> "Review the package.json of a React + Express app and identify packages that are redundant, outdated, or unused. Suggest the minimal set of changes to reduce bundle size and attack surface."

---

### 4. Authentication & Security Hardening

**Goal:** Replace the toy username-only login with a secure authentication mechanism.

**Tasks:**
- [ ] Add `bcrypt` for password hashing before storing user credentials
- [ ] Implement JWT-based session tokens (or integrate OAuth via Passport.js)
- [ ] Add rate limiting to the `/data` endpoint using `express-rate-limit`
- [ ] Validate and sanitize all POST body inputs with `express-validator` or Zod
- [ ] Add CORS configuration to restrict allowed origins

**Prompt for AI assistance:**
> "Add JWT authentication to an existing Express.js app. Create a POST /login route that validates credentials, and a middleware that protects all other API routes by verifying a Bearer token."

---

### 5. Testing Improvements

**Goal:** Make the test suite reliable, fast, and runnable without external services.

**Tasks:**
- [ ] Mock the MongoDB connection in unit tests to avoid requiring a live database
- [ ] Add a dedicated test database or use `mongodb-memory-server` for integration tests
- [ ] Fix the `npm run build` script so E2E tests use the production-built bundle, not watch mode
- [ ] Add a GitHub Actions workflow that runs `npm run test:unit` on every push
- [ ] Increase unit test coverage to ≥80% for server-side controller logic

**Prompt for AI assistance:**
> "Write a Jest test for an Express route handler that saves parking data to MongoDB. Use jest.mock to replace the Mongoose model so the test does not require a real database connection."

---

### 6. CI/CD Pipeline

**Goal:** Automate linting, testing, and deployment on every pull request.

**Tasks:**
- [ ] Create `.github/workflows/ci.yml` that runs on `push` and `pull_request`
  - Install dependencies (`npm ci`)
  - Build the bundle (`npm run build:once`)
  - Run unit tests (`npm run test:unit`)
- [ ] Add status badge to `README.md`
- [ ] Configure Playwright to run E2E tests against the CI-built bundle
- [ ] Add a deployment step for a cloud target (e.g., Railway, Render, or Azure)

---

### 7. Database & Data Model Improvements

**Goal:** Make parking data persistent, validated, and queryable.

**Tasks:**
- [ ] Review and harden the Mongoose schema for parking spots (required fields, types, defaults)
- [ ] Add geospatial indexing (`2dsphere`) to the parking spot location field for proximity queries
- [ ] Replace `useNewUrlParser: true` (deprecated) with modern Mongoose connection options
- [ ] Add a GET `/data` endpoint that returns nearby parking spots filtered by location

---

### 8. Cloud Deployment

**Goal:** Make the app publicly accessible and scalable.

**Tasks:**
- [ ] Deploy to a PaaS provider (Railway, Render, or Azure App Service)
- [ ] Configure a managed MongoDB instance (MongoDB Atlas)
- [ ] Set all secrets via environment variables in the platform dashboard
- [ ] Set up custom domain and HTTPS
- [ ] Add health check endpoint (`GET /health`) for uptime monitoring

---

## Priority Order

1. **Environment Variable Management** — unblocks everything else
2. **Dependency Audit and Cleanup** — reduces risk before going public
3. **Authentication & Security Hardening** — required before real users
4. **CI/CD Pipeline** — enforces quality on every change
5. **Dockerization** — simplifies local dev and deployment
6. **Testing Improvements** — increases confidence during refactors
7. **Database & Data Model Improvements** — improves data quality
8. **Cloud Deployment** — final step to go live

---

## Future Vision (Post-MVP)

- OAuth login (Google, GitHub)
- Real-time parking updates via WebSockets
- Mobile app (React Native)
- Kubernetes deployment on Azure AKS
- Cassandra or Redis for high-throughput parking data
- Micro-services split (auth service, data service, map service)
- Android / iOS App Store submission
