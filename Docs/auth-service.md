# Auth Service

## Description

This service is in charge of all Authentication and Authorization activities and functions

> ## Content

> ## Auth

- [User Signup](#user-signup)
- [User Signin](#user-signin)
- [Forget Password](#forgot-password)
- [Reset User Password](#reset-user-password)
- [Verify Otp](#verify-otp)
- [Change User Password](#change-user-password)

## User Signup

> **POST** /api/v1/auth/sign-up


| Body      |              | Description                                             |
| --------- | ------------ | ------------------------------------------------------- |
| username  | **required** | Username of the account to be created                   |
| email     | **required** | email address of the account to be created              |
| Password  | **required**  | password of the account to be created                    |

#### Sample Response

> Status : 201 Created

```json
{
  "message": "Sign up  successful"
}
```

### Possible error message

```json
{
  "message": "User already exist or input validation error ",
  "errors": [
    {
      "username": "username is required"
    },
    {
      "Email": "Email is required"
    },
    {
      "Password": "password is required"
    }
  ]
}
```

---

## User Signin

> **POST** /api/v1/auth/sign-in

| Body     |              | Description                                |
| -------- | ------------ | ------------------------------------------ |
| email    | **required** | email address of the account to be created |
| Password | **required** | password of the account to be created      |

## Sample Response

> Status: 200 Ok

```json
{
  "user": {
    "id": "658b558347e889a31e9ee85f",
    "username": "John Doe",
    "email": "JohnDoe@gmail.com",
    "createdAt": "2024-04-26T22:36:51Z",
    "updatedAt": "2024-04-27T09:52:40Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImZhbnRhY29rZUBnbWFpbC5jb20iLCJGaXJzdF9uYW1lIjoiRmFudGEiLCJMYXN0X25hbWUiOiJDb2tlIiwiVWlkIjoiNjU4YjU1ODM0N2U4ODlhMzFlOWVlODVmIiwiVXNlcl90eXBlIjoiQURNSU4iLCJleHAiOjE3MDM3NTcxNjB9.L0HiRH399fEF1EssIUGrymV9lmeth3OJtbEu0QqIt-4"
}
```

### Possible error messages

```json
  {
    "message":"user does not exist"}
   "error" :[
    {
      "email":"Invalid email address",
    },
    {
      "Password":"Invalid password"
    }
   ]

```

---




## Forgot Password

> **POST** /api/v1/auth/forgot-password

| Body  |              | Description       |
| ----- | ------------ | ----------------- |
| email | **required** | email of the user |

| request |              | Description    |
| ------- | ------------ | -------------- |
| origin  | **optional** | request origin |

## Sample Response

> Status: 200 Ok

```json
{
  "message": "Otp"
}
```

### Possible error messages

```json
  {
    "message":"email does not exist"
  },
  {
    "message":"internal server error"
  }

```

---


## Verify Otp

> **POST** /api/v1/auth/verify-otp

| Body  |              | Description       |
| ----- | ------------ | ----------------- |
| otp | **required**   | otp that was sent |

| request |              | Description    |
| ------- | ------------ | -------------- |
| origin  | **optional** | request origin |

## Sample Response

> Status: 200 Ok

```json
{
  "message": "verified successfuly, please reset"
}
```

### Possible error messages

```json
  {
    "message":"email does not exist"
  },
  {
    "message":"internal server error"
  }

```

---
## Reset User Password

> **POST** /api/v1/auth/reset-password

| Body       |              | Description                       |
| ---------- | ------------ | --------------------------------- |
| email    | **required**   | user email                        |
| password | **required**   | new password                      |


## Sample Response

> Status: 200 Ok

```json
{
  "message": "Password reset was successful"
}
```

### Possible error messages

```json
  {
    "message":"invalid token"
  },
  {
    "message":"token expired"
  },
  {
    "message":"internal server error"
  }

```

---

