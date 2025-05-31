# Viral Vabi Backend

This is the backend for the Viral Vabi application, built with Node.js, Express, and MongoDB. It provides RESTful APIs for user management and URL shortening/tracking.

## Features

- User registration and authentication
- User roles: `user` and `admin`
- URL shortening with unique keys
- Track click counts for each URL
- User and URL CRUD operations

## Project Structure

```
src/
  app.js                # Main Express app setup
  server.js             # Server entry point
  module/
    user/
      users.models.ts   # Mongoose user model (TypeScript)
      users.validations.ts # Zod validation for user data
  modules/
    user/
      user.model.js     # Mongoose user model (JavaScript)
    url/
      url.model.js      # Mongoose URL model
      url.controller.js # URL controller logic
      url.route.js      # URL routes
      url.service.js    # URL business logic
```

## User Model

- `name`: String (required)
- `password`: String (required)
- `total_url`: Number (default: 0)
- `isActivated`: Boolean (default: false)
- `isBlocked`: Boolean (default: false)
- `isDeleted`: Boolean (default: false)
- `role`: String (default: "user", enum: ["user", "admin"])
- `photoUrl`: String (default: "")

## URL Model

- `key`: String (unique, required)
- `actual_url`: String (required)
- `user_id`: ObjectId (reference to User, required)
- `click_count`: Number (default: 0)

## Getting Started

1. Install dependencies:
   ```powershell
   npm install
   ```
2. Set up your MongoDB connection in the environment configuration.
3. Start the server:
   ```powershell
   npm start
   ```

## License

MIT
