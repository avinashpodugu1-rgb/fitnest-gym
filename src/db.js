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

// Seed default data if database is empty so endpoints return data immediately
const memberCount = db.prepare('SELECT COUNT(*) as count FROM members').get().count;
if (memberCount === 0) {
  const insertMember = db.prepare('INSERT INTO members (name) VALUES (?)');
  const m1 = insertMember.run('Asha Rao');
  const m2 = insertMember.run('Bikram Sen');

  const insertLocker = db.prepare('INSERT INTO lockers (name, floor) VALUES (?, ?)');
  const l1 = insertLocker.run('A-101', 'Floor 1');
  const l2 = insertLocker.run('B-201', 'Floor 2');
  const l3 = insertLocker.run('C-301', 'Floor 3');

  db.prepare('INSERT INTO allotments (member_id, locker_id) VALUES (?, ?)').run(
    m1.lastInsertRowid,
    l1.lastInsertRowid
  );
}

module.exports = db;
