# Backend for the Tiresias App

This repository will serve as the [backend for the main app](https://github.com/jtreeves/predictions-backend). It will directly pull from the API. However, unlike the API, when the information is displayed on the app's frontend, it will be in a visually appealing way, as opposed to in a raw format.

**Contents**

1. [Models](https://github.com/jtreeves/predictions-backend#models)
2. [Routes](https://github.com/jtreeves/predictions-backend#routes)
3. [File Structure](https://github.com/jtreeves/predictions-backend#file-structure)

## Models

![ERD](/images/erd.png)

## Routes

| Method | Model       | Path     | File       | Description                        |
| ------ | ----------- | -------- | ---------- | ---------------------------------- |
| POST   | users       | /signup  | users.js   | Sign up a new user                 |
| POST   | users       | /login   | users.js   | Log in an existing user            |
| GET    | users       | /:id     | users.js   | Display a user's data              |
| PUT    | users       | /:id     | users.js   | Update a user's data               |
| DELETE | users       | /:id     | users.js   | Delete a user's account            |
| POST   | predictions | /:id     | budgets.js | Create a new prediction            |
| GET    | predictions | /all/:id | budgets.js | View all of a user's predictions   |
| GET    | predictions | /:id     | budgets.js | View one of a user's predictions   |
| PUT    | predictions | /:id     | budgets.js | Update one of a user's predictions |
| DELETE | predictions | /:id     | budgets.js | Delete one of a user's predictions |

## File Structure

```
predictions-backend
|-- controllers
|   |-- users.js
|   |-- predictions.js
|-- models
|   |-- schemas
|   |   |-- subschemas
|   |   |   |-- Favorite.js
|   |   |   |-- Note.js
|   |   |-- User.js
|   |   |-- Prediction.js
|   |-- index.js
|-- middleware
|   |-- authentication.js
|-- test
|   |-- users.test.js
|   |-- predictions.test.js
|-- server.js
|-- package.json
|-- package-lock.json
|-- README.md
|-- .gitignore
```