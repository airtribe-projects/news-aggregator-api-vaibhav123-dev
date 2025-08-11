# Authentication API

This project implements a basic user authentication system using Node.js, Express, bcrypt for password hashing, and JWT for authentication tokens.

## Features

- User Registration with hashed passwords
- User Login with password verification
- JWT token generation on successful login
- Environment variable configuration
- Testing endpoints with Postman

---

## Requirements

- Node.js (>= 14.x)
- npm or yarn
- MongoDB (local or cloud e.g. MongoDB Atlas)
- Postman (for API testing)

---

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <your-project-directory>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** in the root directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/authdb
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the server**
   ```bash
   npm start
   ```
   or for development with auto-reload:
   ```bash
   npm run dev
   ```

---

## API Endpoints

### 1. Register User

**POST** `/register`  
Registers a new user and stores the hashed password in the database.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Success Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "64d2a1f5b2c5f45f48b8e123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### 2. Login User

**POST** `/login`  
Authenticates the user and returns a JWT token if credentials are valid.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Success Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response:**
```json
{
  "message": "Invalid email or password"
}
```

---

## Password Hashing

- Passwords are hashed using **bcrypt** before storing in the database.
- On login, bcrypt's `compare` function is used to verify the password.

---

## Testing with Postman

1. Start the server using:
   ```bash
   npm start
   ```

2. Open Postman and create a collection.
3. Add requests for:
   - POST `/register`
   - POST `/login`
   - GET  `/preferences`
   - PUT  `/preferences`
   - GET  `/news`
4. Send JSON in the request body as shown above.

---

## License

This project is licensed under the MIT License.