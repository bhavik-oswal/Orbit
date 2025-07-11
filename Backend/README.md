# User Registration & Login Endpoint Documentation


## Endpoints

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
