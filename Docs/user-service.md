# User Microservice

## Description

This service is in charge of user management and functions

> ## Content

> ## User

- [Get Current User](#get-current-user)
- [Update User](#update-user)
- [Delete User](#delete-user)

## Get Current User

> **GET** /api/v1/user/me

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

#### Sample Response

> Status : 200

```json
  {
    "id": "2323",
    "username": "someone",
    "email": "someone@gmail.com",
  },
```

#### Possible Error message

```json
{
  "message": "unauthorized"
}
```

---


## Update User

> **PATCH** /api/v1/user/update-user

| Body     |                 | Description                    |
| ----     |  ------------   | --------------------------     |
| username |   **required**  | username of the user to update |

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

#### Sample Response

> Status : 200 Ok

```json
{
  "id": "23232",
  "username": "jackrodwell",
  "email": "jackhee@gmail.com"
}
```

#### Possible error message

```json
  {
    "message":"Internal server error",

  },
   {
    "message":"User not found",

  },
  {
    "message": "unauthorized"
  },
```

---


---

## Delete User

> **DELETE** /api/v1/user/delete-user

| Body     |              | Description                    |
| -------- | ------------ | ------------------------------ |
| password | **required** | password of the user to delete |

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

#### Sample Response

> Status : 200 Ok

```json
{
    "message":"User deleted successfully",
}
```

#### Possible error message

```json
  {
    "message":"Internal server error",

  },
  {
    "message": "unauthorized"
  },
  {
    "message": "invalid password"
  },
```

---
