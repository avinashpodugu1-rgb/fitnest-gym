# FitNest Gym – Locker Room API

**BDF Group Assignment · Backend Development Fundamentals (Modules 1 to 3)**
**Group:** ST-CSE2D-G01 · **Theme 1 of 30:** Locker rooms
**Twist:** Allowed values – a locker's floor must be `Floor 1`, `Floor 2` or `Floor 3`.

> *"Our staff write locker numbers on paper. Members forget which locker is theirs, and last week two members were given the same one. Please build us a system that fixes this."*

An **Express** server with a **SQLite** database that records members, lockers and which member holds which locker. A locker can be allotted to only one member, so the same locker is never given out twice.

## Team

| # | Part | Member |
|---|------|--------|
| 1 | Server and routes | _name, reg. no._ |
| 2 | Database | _name, reg. no._ |
| 3 | REST endpoints | _name, reg. no._ |
| 4 | Validation and search | _name, reg. no._ |
| 5 | Twist rule | _name, reg. no._ |
| 6 | Postman and README | _name, reg. no._ |

## How to run

Requires Node.js.

```bash
npm install
npm start
```

The server runs on `http://localhost:3000`. The SQLite file `fitnest.db` is created automatically on the first run.

## Project structure

```
fitnest-gym/
├── server.js                 # Express setup and routes (part 1)
├── src/
│   ├── db.js                 # SQLite connection and the 3 tables (part 2)
│   ├── validation.js         # input checks and the allowed floors (parts 4 and 5)
│   └── routes/
│       ├── lockers.js        # CRUD and search by floor (parts 3 and 4)
│       ├── members.js        # members routes
│       └── allotments.js     # allotments and the join endpoint (part 3)
└── postman/FitNest-Locker-API.postman_collection.json   # (part 6)
```

## Database

Three related tables:

| Table | Columns |
|-------|---------|
| `members` | `id` (primary key), `name` |
| `lockers` | `id` (primary key), `name`, `floor` |
| `allotments` | `id` (primary key), `member_id` → members.id, `locker_id` → lockers.id (**UNIQUE**) |

`locker_id` is `UNIQUE` in `allotments`, so one locker can belong to only one member. This fixes the client's problem.

## Endpoints

### Lockers

| Method | URL | Body | Success | Errors |
|--------|-----|------|---------|--------|
| GET | `/lockers` | – | `200` | – |
| GET | `/lockers?floor=Floor 2` | – | `200` | `400` invalid floor |
| GET | `/lockers/:id` | – | `200` | `404` |
| POST | `/lockers` | `{ "name", "floor" }` | `201` | `400` |
| PUT | `/lockers/:id` | `{ "name", "floor" }` | `200` | `400`, `404` |
| DELETE | `/lockers/:id` | – | `200` | `404` |

### Members

| Method | URL | Body | Success | Errors |
|--------|-----|------|---------|--------|
| GET | `/members` | – | `200` | – |
| GET | `/members/:id` | – | `200` | `404` |
| POST | `/members` | `{ "name" }` | `201` | `400` |

### Allotments and the join

| Method | URL | Body | Success | Errors |
|--------|-----|------|---------|--------|
| GET | `/allotments` | – | `200` | – |
| POST | `/allotments` | `{ "member_id", "locker_id" }` | `201` | `400` (locker already allotted), `404` |

`GET /allotments` is the **join endpoint**. It joins `allotments`, `members` and `lockers` and returns the member name and the locker name:

```json
[{ "id": 1, "member_name": "Asha Rao", "locker_name": "A-101", "floor": "Floor 2" }]
```

## Validation

On add and update of a locker:

- `name` is required and cannot be empty.
- `floor` is required and must be exactly `Floor 1`, `Floor 2` or `Floor 3`.
- Errors return `400` with `{ "error": "<message>" }`.

## Search by query parameter

`GET /lockers?floor=Floor 2` returns only the lockers on that floor. A floor that is not allowed returns `400` with the allowed values.

## The twist: allowed values

Any floor other than Floor 1, Floor 2 or Floor 3 returns `400` and a message that lists the allowed values.

| Test | Request | Expected |
|------|---------|----------|
| 1 | `POST /lockers` with floor `"Floor 1"` | `201` |
| 2 | `POST /lockers` with floor `"Other"` | `400`, allowed values shown |
| 3 | `PUT /lockers/:id` with floor `"Floor 2"` | `200` |

Test 2 response:

```json
{ "error": "Invalid floor \"Other\". Allowed values: Floor 1, Floor 2, Floor 3" }
```

## Postman

1. Run `npm start`.
2. In Postman, **Import** `postman/FitNest-Locker-API.postman_collection.json`.
3. Click **Run** on the collection and run all folders in order.

Folder **1. Twist tests** has the three tests from the brief. Run it first, because later folders reuse the ids it saves. The base URL is the collection variable `baseUrl` (`http://localhost:3000`).

## Status codes used

| Code | Meaning |
|------|---------|
| 200 | OK (read, update, delete) |
| 201 | Created |
| 400 | Invalid input |
| 404 | Not found |

## Tech stack

Node.js · Express · SQLite (`better-sqlite3`) · Postman
