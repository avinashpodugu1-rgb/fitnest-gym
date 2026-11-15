<!--
  FITNEST GYM — LOCKER ROOM MANAGEMENT API
  Backend Development Fundamentals | Group ST-CSE2D-G01
-->

<div align="center">

# 🏋️ FITNEST GYM

### Locker Room Management API

**Smart Locker Management. Zero Duplicate Allotments. Better Gym Operations.**

<br>

[![Test](https://github.com/avinashpodugu1-rgb/fitnest-gym/actions/workflows/test.yml/badge.svg)](https://github.com/avinashpodugu1-rgb/fitnest-gym/actions/workflows/test.yml)
[![Live API](https://img.shields.io/badge/Live%20API-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://fitnest-gym-api.onrender.com)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://www.postman.com/)

<br>

**Backend Development Fundamentals | Modules 1–3**

| Group | Theme | Special Twist |
|:---:|:---:|:---:|
| ST-CSE2D-G01 | Theme 1 of 30 | Floor 1, Floor 2 and Floor 3 only |

</div>

---

## 📌 About the Project

> "Our staff write locker numbers on paper. Members forget which locker is theirs, and last week two members were given the same one. Please build us a system that fixes this."

**FitNest Gym – Locker Room API** is a backend application developed to simplify gym locker management.

The system uses Node.js, Express.js and SQLite to manage gym members, lockers and locker allotments.

It ensures that each locker is assigned to only one member, preventing duplicate assignments and maintaining organized locker records.

Our goal is to replace manual locker tracking with a reliable and efficient digital solution.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🖥️ Interactive Dashboard | Root web dashboard with live status indicators, counts and direct links. |
| ⚡ Auto Data Seeding | Automatically initializes sample members, lockers and allotments on startup. |
| 👤 Member Management | Create and retrieve gym member records. |
| 🔐 Locker Management | Create, view, update and delete lockers. |
| 🔗 Locker Allotment | Assign lockers to registered members. |
| 🛡️ Duplicate Prevention | Prevent the same locker from being assigned twice. |
| ✅ Input Validation | Validate locker names and floor values. |
| 🔎 Floor-Based Search | Search lockers using query parameters. |
| 🏢 Floor Restrictions | Allow only Floor 1, Floor 2 and Floor 3. |
| 🧪 API Testing | Test endpoints using Postman collections. |

---

## 👥 Meet Our Team

**Team ST-CSE2D-G01**

Four contributors worked together to develop the FitNest Gym Locker Room API.

| # | Team Member | Registration Number | Contribution |
|:---:|---|:---:|---|
| 01 | **P. Avinash** | `252U1R1194` | Express server setup, route integration and overall project coordination. |
| 02 | **P. Gopi Krishna** | `252U1R1196` | SQLite database configuration, table creation and database relationships. |
| 03 | **P. Dilleswara Rao** | `252U1R1198` | REST API development, including locker, member and allotment endpoints. |
| 04 | **P. Sri RamCharan** | `252U1R1199` | Input validation, floor restrictions, floor-based search and API testing/documentation. |

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime environment |
| Express.js | Backend framework |
| SQLite | Relational database |
| better-sqlite3 | SQLite database integration |
| Jest | Automated unit & integration testing framework |
| Supertest | HTTP assertion library for endpoint testing |
| Postman / Newman | API collection testing and automated test runner |
| GitHub Actions | Automated CI pipeline (`npm test` on push & PR) |
| Render | Cloud application deployment |
| GitHub | Version control and collaboration |

---

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git (optional)

### Step 1: Clone the Repository

```bash
git clone https://github.com/avinashpodugu1-rgb/fitnest-gym.git
```

### Step 2: Navigate to the Project

```bash
cd fitnest-gym
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Server

```bash
npm start
```

### Step 5: Run Automated Tests

Execute the Jest test suite covering all API endpoints, validation, and error states:

```bash
npm test
```

### Step 6: Access the API

The application runs at:

```text
http://localhost:3000
```

The SQLite database file `fitnest.db` is created automatically when the application runs for the first time.

---

## 🌐 Live Deployment

Our backend application is deployed using **Render**.

<div align="center">

### 🚀 LIVE API

[![Open Live API](https://img.shields.io/badge/OPEN%20LIVE%20API-Click%20Here-success?style=for-the-badge&logo=render)](https://fitnest-gym-api.onrender.com)

**https://fitnest-gym-api.onrender.com**

</div>

### Deploy Your Own Version

1. Open the Render Dashboard.
2. Click **New + → Web Service**.
3. Connect your GitHub repository.
4. Configure the following settings:

| Configuration | Value |
|---|---|
| Runtime | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Plan | Free |

5. Click **Deploy Web Service**.
6. Once deployment is successful, Render provides your application URL.

[Open Render Dashboard](https://dashboard.render.com/)

---

## 📂 Project Structure

```text
fitnest-gym/
│
├── .env.example
├── .github/
│   └── workflows/
│       └── test.yml
├── server.js
├── render.yaml
├── package.json
│
├── src/
│   │
│   ├── db.js
│   ├── dashboard.js
│   ├── validation.js
│   │
│   └── routes/
│       ├── lockers.js
│       ├── members.js
│       └── allotments.js
│
├── tests/
│   └── api.test.js
│
└── postman/
    └── FitNest-Locker-API.postman_collection.json
```

### File Description

| File | Responsibility |
|---|---|
| `server.js` | Express server setup, route mounting, catch-all 404 & global error middleware |
| `src/dashboard.js` | Modular HTML dashboard generator with live status and endpoint badges |
| `src/db.js` | SQLite connection, table schemas with UNIQUE constraints, and auto seed |
| `src/validation.js` | Input validation and allowed-floor restrictions |
| `src/routes/lockers.js` | Locker CRUD, floor search, and 409 conflict checks |
| `src/routes/members.js` | Member management (GET, POST, PUT, and protected DELETE) |
| `src/routes/allotments.js` | Locker allotment, single allotment retrieval, release, and JOIN queries |
| `tests/api.test.js` | 20 automated integration tests using Jest and Supertest |
| `.github/workflows/test.yml` | GitHub Actions CI workflow executing `npm test` on Node 20 |
| `.env.example` | Template environment configuration (`PORT`, `DB_FILE`) |
| `render.yaml` | Render Blueprint configuration for automated cloud deployment |
| Postman Collection | Comprehensive Postman collection covering all endpoints |

---

## 🗄️ Database Design

The application contains three related database tables.

### 1. Members Table

Stores gym member information.

| Column | Description |
|---|---|
| id | Primary Key |
| name | Member Name |

### 2. Lockers Table

Stores available locker information.

| Column | Description |
|---|---|
| id | Primary Key |
| name | Locker Name (UNIQUE) |
| floor | Floor Number |

### 3. Allotments Table

Stores the relationship between members and lockers.

| Column | Description |
|---|---|
| id | Primary Key |
| member_id | Foreign Key → members.id |
| locker_id | Foreign Key → lockers.id (UNIQUE) |

**Important:** The `locker_id` column has a UNIQUE constraint. This prevents the same locker from being allotted to multiple members.

---

## 🔌 API Documentation

**Base URL:**

```text
http://localhost:3000
```

*Live Production Base URL:* `https://fitnest-gym-api.onrender.com`

### 🌐 System & Dashboard Endpoints

| Method | Endpoint | Description | Status |
|---|---|---|---|
| GET | `/` | Visual interactive dashboard (browser) or JSON API status & route directory | 200 |

### 🔐 Locker Endpoints

| Method | Endpoint | Description | Status |
|---|---|---|---|
| GET | `/lockers` | Retrieve all lockers | 200 |
| GET | `/lockers?floor=Floor%202` | Search lockers by floor | 200 |
| GET | `/lockers/:id` | Retrieve locker by ID | 200, 404 |
| POST | `/lockers` | Create a new locker (`name` must be unique) | 201, 400, 409 |
| PUT | `/lockers/:id` | Update locker details | 200, 400, 404, 409 |
| DELETE | `/lockers/:id` | Delete a locker (blocked if allotted; add `?force=true` to override) | 200, 404, 409 |

**Example POST Request:**

```json
{
  "name": "A-101",
  "floor": "Floor 1"
}
```

### 👤 Member Endpoints

| Method | Endpoint | Description | Status |
|---|---|---|---|
| GET | `/members` | Retrieve all members | 200 |
| GET | `/members/:id` | Retrieve member by ID | 200, 404 |
| POST | `/members` | Register a new member | 201, 400 |
| PUT | `/members/:id` | Update member name | 200, 400, 404 |
| DELETE | `/members/:id` | Delete member (blocked if member has active allotments) | 200, 404, 409 |

**Example POST Request:**

```json
{
  "name": "Asha Rao"
}
```

### 🔗 Allotment Endpoints

| Method | Endpoint | Description | Status |
|---|---|---|---|
| GET | `/allotments` | Retrieve all locker allotments (joined) | 200 |
| GET | `/allotments/:id` | Retrieve single allotment details (joined) | 200, 404 |
| POST | `/allotments` | Assign a locker to a member | 201, 400, 404 |
| DELETE | `/allotments/:id` | Release a locker without deleting member or locker | 200, 404 |

**Example POST Request:**

```json
{
  "member_id": 1,
  "locker_id": 1
}
```

### Example Allotment Response

The `GET /allotments` endpoint joins the members, lockers and allotments tables.

```json
[
  {
    "id": 1,
    "member_name": "Asha Rao",
    "locker_name": "A-101",
    "floor": "Floor 2"
  }
]
```

---

## 🛡️ Validation & Special Assignment Twist

One of the important requirements of this project is the floor validation rule.

A locker can only belong to one of these three floors:

- `Floor 1`
- `Floor 2`
- `Floor 3`

### Validation Rules

1. Locker name is mandatory.
2. Locker name cannot be empty.
3. Floor value is mandatory.
4. Only the three specified floor values are accepted.
5. Invalid inputs return HTTP 400 with an appropriate error message.

### Example Invalid Request

```json
{
  "name": "A-105",
  "floor": "Other"
}
```

### Expected Error Response

```json
{
  "error": "Invalid floor \"Other\". Allowed values: Floor 1, Floor 2, Floor 3"
}
```

### Special Twist Test Cases

| Test | Request | Expected Result |
|---|---|---|
| 01 | POST `/lockers` with Floor 1 | 201 Created |
| 02 | POST `/lockers` with Other | 400 Bad Request |
| 03 | PUT `/lockers/:id` with Floor 2 | 200 OK |

---

## 🔎 Search Functionality

The application supports searching lockers using query parameters.

**Example:**

```http
GET /lockers?floor=Floor 2
```

This returns lockers belonging to Floor 2.

If an invalid floor is provided, the API returns HTTP 400 and displays the allowed floor values.

---

## 🧪 Automated Testing (Jest & Supertest)

The project includes an automated test suite with **20 integration tests** in `tests/api.test.js` using Jest and Supertest.

### Running Tests

To run the automated tests against an isolated, in-memory SQLite database:

```bash
npm test
```

### What the Test Suite Covers

| Test Group | Scenarios Tested |
|---|---|
| **Locker Management** | Create locker (201), get locker (200), update locker (200), delete locker (200) |
| **Floor Restrictions** | Invalid floor returns 400 with allowed values list; valid floors accepted |
| **Input Validation** | Missing name or blank name returns 400 |
| **Floor Search Filter** | `GET /lockers?floor=Floor 2` returns exact matches; invalid floor returns 400 |
| **Member Operations** | Create member (201), update member name (200), validation on empty name (400) |
| **Allotment Logic** | Allot free locker (201), duplicate locker allotment rejection (400), unknown IDs (404) |
| **Allotment Endpoints** | `GET /allotments/:id` (200/404), `DELETE /allotments/:id` release locker (200) |
| **409 Conflict Handling** | Duplicate locker name (409), delete member with active allotment (409), delete allotted locker without force (409) |
| **Force Delete** | `DELETE /lockers/:id?force=true` releases allotment and deletes locker (200) |
| **Error Middleware** | Undefined routes return 404 `{ error: "Route not found" }`, malformed JSON body returns 400 `{ error: "Invalid JSON body" }` |

### CI / CD Pipeline

Continuous Integration is configured via [GitHub Actions](.github/workflows/test.yml). On every `push` and `pull_request` to `main`, the test workflow:
1. Checks out the code.
2. Sets up Node.js 20.
3. Installs dependencies using `npm ci`.
4. Executes `npm test` to verify 100% test pass rate.

---

## 📮 API Testing with Postman

We have included a Postman collection to test the API endpoints.

### Testing Steps

1. Start the application using `npm start`.
2. Open Postman.
3. Click **Import**.
4. Select:

   `postman/FitNest-Locker-API.postman_collection.json`

5. Open the imported collection.
6. Run the folders in the specified order.
7. Execute **1. Twist tests** first because later folders reuse the IDs saved by those tests.

### Base URL Variable

The Postman collection uses:

```text
baseUrl = http://localhost:3000
```

For live testing, change the variable to:

```text
https://fitnest-gym-api.onrender.com
```

---

## 📟 HTTP Status Codes

| Status Code | Meaning |
|:---:|---|
| `200` | OK – Request completed successfully |
| `201` | Created – New resource created |
| `400` | Bad Request – Invalid input, malformed JSON or allotment conflict |
| `404` | Not Found – Requested resource or undefined route does not exist |
| `409` | Conflict – Unique constraint violation or active allotment dependency |
| `500` | Internal Server Error – Unexpected server error |

### 🔒 Data Integrity & 409 Conflict Handling

To guarantee data integrity and prevent accidental data loss, the API enforces:

1. **Unique Locker Names**: Creating or updating a locker with a name that already exists returns `409 Conflict`:
   ```json
   { "error": "Locker name already exists" }
   ```
2. **Safe Member Deletion**: Deleting a member who still has an active locker allotment returns `409 Conflict`:
   ```json
   { "error": "Cannot delete member with active allotment" }
   ```
3. **Safe Locker Deletion**: Deleting a locker with an active allotment returns `409 Conflict`:
   ```json
   { "error": "Cannot delete locker with active allotment. Use ?force=true to override." }
   ```
   Passing `?force=true` (e.g. `DELETE /lockers/:id?force=true`) releases the allotment and deletes the locker.

---

## ⚠️ Known Limitations

- **Ephemeral Storage on Render (Free Plan)**: SQLite uses a file (`fitnest.db`) within the container. On Render's free plan, instances spin down after inactivity and container filesystems are ephemeral. Any data added dynamically resets to the default seed state whenever the container restarts or redeploys. For permanent cloud persistence, persistent disks or an external database (e.g., PostgreSQL) can be used.

---

## 🎯 Project Objectives

Through this project, we aimed to:

- Understand backend application development.
- Implement RESTful API architecture.
- Work with relational databases.
- Perform CRUD operations.
- Implement input validation.
- Understand database relationships and constraints.
- Test APIs using Postman.
- Deploy backend applications using Render.
- Collaborate as a team using GitHub.

---

## 📚 Learning Outcomes

By developing this project, our team gained practical experience in:

- Node.js and Express.js development.
- SQLite database management.
- REST API design and implementation.
- Request validation and error handling.
- Query parameters and database joins.
- API testing and debugging.
- Cloud deployment.
- Team collaboration and project management.

---

<div align="center">

# 💙 BUILT WITH TEAMWORK

### FITNEST GYM — LOCKER ROOM API

**Backend Development Fundamentals**

**Group: ST-CSE2D-G01**

**Theme 1 of 30 · Locker Rooms**

<br>

Developed by:

**P. Avinash · P. Gopi Krishna · P. Dilleswara Rao · P. Sri RamCharan**

<br>

[![GitHub Repository](https://img.shields.io/badge/GitHub-View%20Repository-181717?style=for-the-badge&logo=github)](https://github.com/avinashpodugu1-rgb/fitnest-gym)

[![Live API](https://img.shields.io/badge/Render-Live%20API-46E3B7?style=for-the-badge&logo=render)](https://fitnest-gym-api.onrender.com)

**THANK YOU FOR VISITING OUR PROJECT! 🚀**

</div>
