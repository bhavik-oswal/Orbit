# User & Captain Endpoint Documentation



## Endpoints
---

### Captain Register
`POST /captains/register`

Registers a new captain (driver) in the system. This endpoint validates the input, hashes the password, creates a new captain with vehicle details, and returns an authentication token along with the captain data.

## Request Body

The request body must be in JSON format and include the following fields:

```
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)",
  "vehicle": {
    "color": "string (min 3 chars, required)",
    "plate": "string (min 3 chars, required)",
    "capacity": "number (min 1, required)",
    "vehicleType": "string (car|motorcyle|auto, required)"
  }
}
```

### Example

```
{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "securepass",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Responses

- **201 Created**
  - Captain registered successfully. Returns a JSON object with the authentication token and captain data.
  - Example:
    ```json
    {
      "token": "<jwt_token>",
      "captain": {
        "_id": "<captain_id>",
        "fullname": {
          "firstname": "Alice",
          "lastname": "Smith"
        },
        "email": "alice.smith@example.com",
        "vehicle": {
          "color": "Red",
          "plate": "XYZ1234",
          "capacity": 4,
          "vehicleType": "car"
        }
      }
    }
    ```

- **400 Bad Request**
  - Validation failed or captain already exists. Returns a JSON object with an error message or array of error messages.
  - Example (validation error):
    ```json
    {
      "errors": [
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        }
      ]
    }
    ```
  - Example (captain exists):
    ```json
    {
      "message": "Captain already exists"
    }
    ```

## Notes
- All required fields must be provided and valid.
- The password is securely hashed before storage.
- The response includes a JWT token for authentication.

### Register
`POST /users/register`


Registers a new user in the system. This endpoint validates the input, hashes the password, creates a new user, and returns an authentication token along with the user data.


## Request Body

```
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example

```
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```


## Responses

- **200 OK**
  - User registered successfully. Returns a JSON object with the authentication token and user data.
  - Example:
    ```json
    {
      "token": "<jwt_token>",
      "user": {
        "_id": "<user_id>",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

- **400 Bad Request**
  - Validation failed. Returns a JSON object with an array of error messages.
  - Example:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```


## Notes
- All required fields must be provided and valid.
- The password is securely hashed before storage.
- The response includes a JWT token for authentication.

---

### Login
`POST /users/login`

## Description

Authenticates an existing user. Validates the input, checks the credentials, and returns an authentication token along with the user data if successful.

## Request Body

The request body must be in JSON format and include the following fields:

```
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example

```
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

- **200 OK**
  - User authenticated successfully. Returns a JSON object with the authentication token and user data.
  - Example:
    ```json
    {
      "token": "<jwt_token>",
      "user": {
        "_id": "<user_id>",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

- **400 Bad Request**
  - Validation failed. Returns a JSON object with an array of error messages.
  - Example:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```

- **401 Unauthorized**
  - Invalid email or password. Returns a JSON object with an error message.
  - Example:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

## Notes
- Both fields are required and must be valid.
- Returns a JWT token for authentication upon successful login.

---

### Get User Profile
`GET /users/profile`

## Description

Returns the authenticated user's profile information. Requires a valid JWT token in the `Authorization` header as a Bearer token or in the `token` cookie.

## Authentication

- This endpoint is protected. You must be logged in and provide a valid token.

## Responses

- **200 OK**
  - Returns the user profile object.
  - Example:
    ```json
    {
      "_id": "<user_id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
    ```

- **401 Unauthorized**
  - Missing, invalid, or blacklisted token.
  - Example:
    ```json
    {
      "message": "Unauthorized access"
    }
    ```

## Notes
- Requires authentication.
- Returns the current user's data.

---

### Logout
`GET /users/logout`

## Description

Logs out the authenticated user by clearing the authentication cookie and blacklisting the JWT token. Requires a valid JWT token in the `Authorization` header as a Bearer token or in the `token` cookie.

## Authentication

- This endpoint is protected. You must be logged in and provide a valid token.

## Responses

- **200 OK**
  - User logged out successfully.
  - Example:
    ```json
    {
      "message": "Logged out"
    }
    ```

- **401 Unauthorized**
  - Missing, invalid, or blacklisted token.
  - Example:
    ```json
    {
      "message": "Unauthorized access"
    }
    ```

## Notes
- Requires authentication.
- The token is blacklisted and cannot be used again.
