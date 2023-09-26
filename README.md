# basic-auth

This is an Express server that implements Basic Authentication, with signup and signin capabilities, using a Postgres database for storage.

## Installation

* `npm install`

Set your PORT and Database environment with an .env file

```text
PORT=3001
DATABASE_URL=postgres://localhost:5434/database_name
```

## Usage

### Authentication System (Phase 1)

#### CREATE (POST)

- **Route**: `/auth/signup`
- **Method**: POST
- **Parameters**:
  - `username` (String)
  - `password` (String)


#### CREATE (POST)

- **Route**: `/auth/signin`
- **Method**: POST
- **Parameters**:
  - `username` (String)
  - `password` (String)


## URLs

- [Main branch]()
- [PR]()
- [GitHub Actions]()

## Contributors

Ekaterina Khoroshilova