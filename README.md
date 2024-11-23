# Attack Capital API Documentation

## Overview
This is the backend API documentation for Attack Capital. The API provides endpoints for user authentication and blog post management.

## Base URL
```
http://localhost:5000/api
```

## Authentication
The API uses JWT (JSON Web Token) for authentication. Protected endpoints require a valid Bearer token in the Authorization header.

Example:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Endpoints

### Authentication

#### Sign Up
Create a new user account.

- **URL**: `/auth/signup`
- **Method**: `POST`
- **Auth**: None
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Success Response**: 
  - **Code**: 200
  - **Content**: User object with JWT token

#### Login
Authenticate existing user.

- **URL**: `/auth/login`
- **Method**: `POST`
- **Auth**: None
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Success Response**: 
  - **Code**: 200
  - **Content**: JWT token for authentication

### Blog Posts

#### Create Post
Create a new blog post.

- **URL**: `/posts`
- **Method**: `POST`
- **Auth**: Required (Bearer Token)
- **Body**:
  ```json
  {
    "title": "Post Title",
    "content": "Post content goes here"
  }
  ```
- **Success Response**: 
  - **Code**: 200
  - **Content**: Created post object

#### Get Posts
Retrieve blog posts for a specific author.

- **URL**: `/posts`
- **Method**: `GET`
- **Auth**: Required (Bearer Token)
- **Query Parameters**:
  - `author`: User ID of the post author
- **Success Response**: 
  - **Code**: 200
  - **Content**: Array of post objects

## Error Responses
The API returns standard HTTP status codes and JSON error messages:

- `400`: Bad Request - Invalid input data
- `401`: Unauthorized - Missing or invalid authentication
- `404`: Not Found - Resource not found
- `500`: Internal Server Error - Server-side error

Example error response:
```json
{
  "error": "Error message description"
}
```

## Development Setup

### Prerequisites
- Node.js
- MongoDB
- Postman (for testing)

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the Server
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```

## Testing
You can import the provided Postman collection (`Attack_Capital.postman_collection.json`) to test all endpoints.

## Security Considerations
- All passwords are hashed before storage
- JWT tokens expire after 24 hours
- CORS is enabled for secure cross-origin requests
- Request rate limiting is implemented to prevent abuse

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
[Add your license information here]