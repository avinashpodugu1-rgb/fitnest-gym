const Database = require('better-sqlite3');

// Opens (or creates) the SQLite file and makes sure the 3 tables exist.
const db = new Database(process.env.DB_FILE || 'fitnest.db');

// SQLite only enforces foreign keys when this is switched on.
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS members (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS lockers (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    name  TEXT NOT NULL,
    floor TEXT NOT NULL
  );

  -- UNIQUE on locker_id means one locker can be allotted to only one member
  CREATE TABLE IF NOT EXISTS allotments (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    member_id INTEGER NOT NULL REFERENCES members(id),
    locker_id INTEGER NOT NULL UNIQUE REFERENCES lockers(id)
  );
`);

module.exports = db;
