const express = require('express');
const db = require('../db');

const router = express.Router();

// The JOIN: each allotment with the member name and the locker name.
const joinQuery = `
  SELECT allotments.id AS id,
         members.name  AS member_name,
         lockers.name  AS locker_name,
         lockers.floor AS floor
  FROM allotments
  JOIN members ON members.id = allotments.member_id
  JOIN lockers ON lockers.id = allotments.locker_id
`;

// GET /allotments  -> join of all 3 tables
router.get('/', (req, res) => {
  res.status(200).json(db.prepare(joinQuery).all());
});

// GET /allotments/:id  -> single allotment with joined member and locker details
router.get('/:id', (req, res) => {
  const allotment = db.prepare(joinQuery + ' WHERE allotments.id = ?').get(req.params.id);
  if (!allotment) {
    return res.status(404).json({ error: 'Allotment not found' });
  }
  res.status(200).json(allotment);
});

// POST /allotments  { "member_id": 1, "locker_id": 1 }
router.post('/', (req, res) => {
  const { member_id, locker_id } = req.body || {};

  if (!Number.isInteger(member_id) || !Number.isInteger(locker_id)) {
    return res.status(400).json({ error: 'member_id and locker_id are required numbers' });
  }

  const member = db.prepare('SELECT id FROM members WHERE id = ?').get(member_id);
  if (!member) {
    return res.status(404).json({ error: 'Member not found' });
  }

  const locker = db.prepare('SELECT id FROM lockers WHERE id = ?').get(locker_id);
  if (!locker) {
    return res.status(404).json({ error: 'Locker not found' });
  }

  // The client's problem: the same locker given to two members.
  const taken = db.prepare('SELECT id FROM allotments WHERE locker_id = ?').get(locker_id);
  if (taken) {
    return res.status(400).json({ error: 'This locker is already allotted to a member' });
  }

  try {
    const result = db
      .prepare('INSERT INTO allotments (member_id, locker_id) VALUES (?, ?)')
      .run(member_id, locker_id);

    const created = db.prepare(joinQuery + ' WHERE allotments.id = ?').get(result.lastInsertRowid);
    res.status(201).json(created);
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE' || (err.message && err.message.includes('UNIQUE'))) {
      return res.status(400).json({ error: 'This locker is already allotted to a member' });
    }
    throw err;
  }
});

// DELETE /allotments/:id  (releases the locker without deleting member or locker)
router.delete('/:id', (req, res) => {
  const existing = db.prepare('SELECT id FROM allotments WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Allotment not found' });
  }

  db.prepare('DELETE FROM allotments WHERE id = ?').run(req.params.id);
  res.status(200).json({ message: 'Allotment deleted' });
});

module.exports = router;
