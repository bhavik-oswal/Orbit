# Backend API Documentation



## Endpoints
---

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

---

#### Register
`POST /captains/register`

Registers a new captain (driver) in the system. This endpoint validates the input, hashes the password, creates a new captain with vehicle details, and returns an authentication token along with the captain data.

##### Request Body
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

##### Example
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

##### Responses
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

##### Notes
- All required fields must be provided and valid.
- The password is securely hashed before storage.
- The response includes a JWT token for authentication.

---

#### Login
`POST /captains/login`

Authenticates a captain. Validates the input, checks the credentials, and returns an authentication token along with the captain data if successful.

##### Request Body
```
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

##### Example
```
{
  "email": "alice.smith@example.com",
  "password": "securepass"
}
```

##### Responses
- **200 OK**
  - Captain authenticated successfully. Returns a JSON object with the authentication token and captain data.
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
  - Validation failed. Returns a JSON object with an array of error messages.
  - Example:
    ```json
    {
      "errors": [
        {
          "msg": "Valid email is required",
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

##### Notes
- Both fields are required and must be valid.
- Returns a JWT token for authentication upon successful login.

---

#### Get Captain Profile
`GET /captains/profile`

Returns the authenticated captain's profile information. Requires a valid JWT token in the `Authorization` header as a Bearer token or in the `token` cookie.

##### Authentication
- This endpoint is protected. You must be logged in and provide a valid token.

##### Responses
- **200 OK**
  - Returns the captain profile object.
  - Example:
    ```json
    {
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
- **401 Unauthorized**
  - Missing, invalid, or blacklisted token.
  - Example:
    ```json
    {
      "message": "Unauthorized access"
    }
    ```

##### Notes
- Requires authentication.
- Returns the current captain's data.

---

#### Logout
`GET /captains/logout`

Logs out the authenticated captain by clearing the authentication cookie and blacklisting the JWT token. Requires a valid JWT token in the `Authorization` header as a Bearer token or in the `token` cookie.

##### Authentication
- This endpoint is protected. You must be logged in and provide a valid token.

##### Responses
- **200 OK**
  - Captain logged out successfully.
  - Example:
    ```json
    {
      "message": "Logged out successfully"
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

##### Notes
- Requires authentication.
- The token is blacklisted and cannot be used again.


### Map Endpoints

#### Get Coordinates
`GET /maps/get-coordinates?address=<address>`

Returns latitude and longitude for a given address string.

##### Query Parameters
- `address` (string, required): The address to geocode (min 3 chars).

##### Authentication
- Requires a valid JWT token (user).

##### Responses
- **200 OK**
  - Returns coordinates:
    ```json
    {
      "lat": 19.0760,
      "lng": 72.8777
    }
    ```
- **400 Bad Request**
  - Validation failed.
- **404 Not Found**
  - Address not found.

---

#### Get Distance and Time
`GET /maps/get-distance-time?origin=<origin>&destination=<destination>`

Returns distance and estimated travel time between two addresses.

##### Query Parameters
- `origin` (string, required): Starting address (min 3 chars).
- `destination` (string, required): Destination address (min 3 chars).

##### Authentication
- Requires a valid JWT token (user).

##### Responses
- **200 OK**
  - Returns distance and duration:
    ```json
    {
      "distance": "12 km",
      "duration": "30 mins"
    }
    ```
- **400 Bad Request**
  - Validation failed.
- **500 Internal Server Error**
  - Error calculating distance/time.

---

#### Get Autocomplete Suggestions
`GET /maps/get-suggestions?input=<input>`

Returns address autocomplete suggestions for a given input string.

##### Query Parameters
- `input` (string, required): Partial address (min 3 chars).

##### Authentication
- Requires a valid JWT token (user).

##### Responses
- **200 OK**
  - Returns array of suggestions:
    ```json
    [
      { "description": "Mumbai, Maharashtra, India" },
      { "description": "Mumbai Central, Mumbai, India" }
    ]
    ```
- **400 Bad Request**
  - Validation failed.
- **500 Internal Server Error**
  - Error fetching suggestions.

---

### Ride Endpoints

#### Create Ride
`POST /rides/create`

Creates a new ride request for a user.

##### Request Body
```
{
  "pickup": "string (min 3 chars, required)",
  "destination": "string (min 3 chars, required)",
  "vehicleType": "string (auto|car|moto, required)"
}
```

##### Authentication
- Requires a valid JWT token (user).

##### Responses
- **201 Created**
  - Ride created successfully. Returns ride details:
    ```json
    {
      "user": "<user_id>",
      "pickup": "Andheri East, Mumbai",
      "destination": "Bandra West, Mumbai",
      "fare": 120,
      "otp": "123456",
      "status": "pending"
    }
    ```
- **400 Bad Request**
  - Validation failed.
- **500 Internal Server Error**
  - Error creating ride.

---

Here's the **Markdown** for the missing `/rides/get-fare` endpoint, formatted to match the style of the second README file:

---

### Get Ride Fare Estimate

`GET /rides/get-fare?pickup=<pickup>&destination=<destination>`

Returns estimated fare for a ride between the given pickup and destination addresses, based on the selected vehicle type.

#### Query Parameters

* `pickup` (string, required): Pickup address (min 3 characters).
* `destination` (string, required): Destination address (min 3 characters).

#### Authentication

* Requires a valid JWT token (user).

#### Responses

* **200 OK**

  * Returns estimated fare for each supported vehicle type:

    ```json
    {
      "auto": 50.0,
      "car": 75.0,
      "moto": 40.0
    }
    ```

* **400 Bad Request**

  * Validation failed (e.g., missing parameters).

    ```json
    {
      "message": "Missing or invalid query parameters"
    }
    ```

* **500 Internal Server Error**

  * Error calculating fare.

    ```json
    {
      "message": "Error calculating fare"
    }
    ```

#### Notes

* Vehicle types are typically `auto`, `car`, and `moto`.
* Calculations are based on distance and pre-defined pricing rules.

---