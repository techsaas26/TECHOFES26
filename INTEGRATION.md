# Frontend Integration Guide – Auth & Profile APIs

This document explains how frontend applications should integrate with the backend authentication and profile system.

---

## 🔹 Base Configuration

### Base URL

```
https://https://techofes26-backend.onrender.com/api
```


### Authentication Mechanism
- JWT-based authentication
- Token returned on login
- Token must be sent in header:
```
Authorization: Bearer <JWT_TOKEN>
```


---

# 1️⃣ Authentication Routes

---

## 📌 POST /auth/register

### Request Body
```json
{
  "username": "john123",
  "fullName": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "9876543210",
  "collegeName": "ABC College",
  "department": "CSE",
  "rollNo": "12345",
  "password": "StrongPassword123",
  "userType": "CEG"
}

```
#### Important Notes: 

- make sure to send email in lowercase - do specify in frontend via validation that only lowercase and numbers allowed ad explicitly convert to lowercase as well.
- username is case sensitive - specify it in the frontend
- all fields are required
- Usertype is a dropdown - either 'CEG' or outside

### Success Reponse
```
{
  "message": "User registered successfully",
  "user": {
    "T_ID": "T00123",
    "username": "john123",
    "email": "john@example.com",
    "userType": "CEG"
  }
}
```


## POST /auth/login
### Request Body
```
{
  "username": "john123",
  "password": "StrongPassword123"
}
```

### Success Response (200)
```
{
  "token": "<JWT_TOKEN>",
  "username": "john123",
  "T_ID": "T00123",
  "userType": "CEG"
}
```

## JWT Handling
### After successful login:
```
localStorage.setItem("token", response.token);
```

### For authenticated API calls:
```
headers: {
  Authorization: `Bearer ${localStorage.getItem("token")}`
}
```

## POST /auth/logout
### Response
```
{
  "message": "Logout successful"
}
```

- Backend does NOT invalidate JWT automatically.
- Frontend MUST remove the token manually:
```
localStorage.removeItem("token");
```
- If you do not remove it, the user will remain authenticated.

# 2️⃣ Profile Route
## GET /profile
### Header Required
```
Authorization: Bearer <JWT_TOKEN>
```

### Success Response
```
{
  "T_ID": "T00123",
  "username": "john123",
  "firstName": "...",
  "lastName": "...",
  "email": "john@example.com",
  "phoneNumber": "...",
  "userType": "CEG",
  "rollNo": "...",
  "college": "...",
  "department": "...",
  "createdAt": "..."
}

```

# 3️⃣ Error Response Format
```
{
  "error": "Error message"
}
```

```
| Status | Meaning                           |
| ------ | --------------------------------- |
| 400    | Validation error / Duplicate data |
| 401    | Token missing / Invalid / Expired |
| 403    | Admin access required             |
| 404    | Unknown endpoint                  |
| 500    | Internal server error             |

```

