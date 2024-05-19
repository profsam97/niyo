# Booking Microservice

## Description

This service is in charge of flight booking related functionality

> ## Content

> ## Booking

- [Get Single Task](#get-single-task)
- [Create Task](#create-task)
- [Get All Booking](#get-all-tasks)
- [Delete Task](#delete-task)
- [Delete All Task](#delete-all-task)

## Get Single Task

> **GET** api/v1/task/:id

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

| Param |              | Description |
| ----- | ------------ | ----------- |
| id    | **required** | task Id  |

#### Sample Response

> Status : 200

```json
  {
    "id": "3",
    "owner": "23232",
    "name" : "My first Task",
    "description" : "This is my first task",
    "createdAt": "2024-04-29T22:36:51Z",
    "updatedAt": "2024-04-29T09:52:40Z"
  },
```

#### Possible Error message

```json
{
  "message": "Task id is required"
}
{
  "message": "unauthorized"
},
{
  "message": "Task not found or user ID mismatch"
}
```

---

## Create Task

> **POST** api/v1/task

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

| Body        |              | Description                                |
| --------    | ------------ | ------------------------------------------ |
| name        | **required** | name of the task                           |
| description | **required** | description of the task to be created      |


#### Sample Response

> Status : 200

```json
  {
    "id": "3",
    "owner": "23232",
    "name" : "My first Task",
    "description" : "This is my first task",
    "createdAt": "2024-04-29T22:36:51Z",
    "updatedAt": "2024-04-29T09:52:40Z"
  },
```

#### Possible Error message

```json
{
  "message": "unauthorized"
},
{
  "message": "internal server error"
}
```
---

## Delete Task

> **DELETE** api/v1/task/delete-task/:id

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

| param |              | Description       |
| ----- | ------------ | ----------------- |
| id    | **required** | task to delete    |

#### Sample Response

> Status : 200

```json
  {
   "response": "Task deleted successfully"
  },
```

#### Possible Error message

```json
{
  "message": "Task ID is required"
}
{
  "message": "unauthorized"
},
{
  "message": "token expired"
}
```

---

## Get All Task

> **GET** api/v1/task

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |


#### Sample Response

> Status : 200

```json
  {
    "id": "1",
    "owner": "23232",
    "name" : "My first Task",
    "description" : "This is my first task",
    "createdAt": "2024-04-29T22:36:51Z",
    "updatedAt": "2024-04-29T09:52:40Z"
  },
  
  {
    "id": "2",
    "owner": "26432",
    "name" : "My Second Task",
    "description" : "This is my Second task",
    "createdAt": "2024-04-29T22:36:51Z",
    "updatedAt": "2024-04-29T09:52:40Z"
  },
  {
    "id": "3",
    "owner": "232",
    "name" : "My third Task",
    "description" : "This is my third task",
    "createdAt": "2024-04-29T22:36:51Z",
    "updatedAt": "2024-04-29T09:52:40Z"
  },
```

#### Possible Error message

```json
{
  "message": "unauthorized"
},
{
  "message": "Internal server error"
}
```

## Delete All Task

> **GET** api/v1/task/delete-tasks

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |


#### Sample Response

> Status : 200

```json
  {
    "message" : "Tasks deleted successfully"
  },
  
```

#### Possible Error message

```json
{
  "message": "unauthorized"
},
{
  "message": "Internal server error"
}
```

