const express = require('express');
const db = require('../db');
const { ALLOWED_FLOORS, floorMessage, validateLocker } = require('../validation');

const router = express.Router();

// GET /lockers                 -> all lockers
// GET /lockers?floor=Floor 2   -> lockers on one floor (query parameter)
router.get('/', (req, res) => {
  const { floor } = req.query;

  if (floor !== undefined) {
    if (!ALLOWED_FLOORS.includes(floor)) {
      return res.status(400).json({ error: floorMessage(floor) });
    }
    const lockers = db.prepare('SELECT * FROM lockers WHERE floor = ?').all(floor);
    return res.status(200).json(lockers);
  }

  res.status(200).json(db.prepare('SELECT * FROM lockers').all());
});

// GET /lockers/:id
router.get('/:id', (req, res) => {
  const locker = db.prepare('SELECT * FROM lockers WHERE id = ?').get(req.params.id);
  if (!locker) {
    return res.status(404).json({ error: 'Locker not found' });
  }
  res.status(200).json(locker);
});

// POST /lockers
router.post('/', (req, res) => {
  const error = validateLocker(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  const { name, floor } = req.body;
  try {
    const result = db
      .prepare('INSERT INTO lockers (name, floor) VALUES (?, ?)')
      .run(name.trim(), floor);

    const created = db.prepare('SELECT * FROM lockers WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(created);
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE' || (err.message && err.message.includes('UNIQUE'))) {
      return res.status(409).json({ error: 'Locker name already exists' });
    }
    throw err;
  }
});

// PUT /lockers/:id
router.put('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM lockers WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Locker not found' });
  }

  const error = validateLocker(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  const { name, floor } = req.body;
  try {
    db.prepare('UPDATE lockers SET name = ?, floor = ? WHERE id = ?').run(
      name.trim(),
      floor,
      req.params.id
    );

    const updated = db.prepare('SELECT * FROM lockers WHERE id = ?').get(req.params.id);
    res.status(200).json(updated);
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE' || (err.message && err.message.includes('UNIQUE'))) {
      return res.status(409).json({ error: 'Locker name already exists' });
    }
    throw err;
  }
});

// DELETE /lockers/:id
// If locker has an allotment, return 409 unless ?force=true is passed
router.delete('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM lockers WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Locker not found' });
  }

  const allotment = db.prepare('SELECT id FROM allotments WHERE locker_id = ?').get(req.params.id);
  if (allotment) {
    if (req.query.force === 'true') {
      db.prepare('DELETE FROM allotments WHERE locker_id = ?').run(req.params.id);
    } else {
      return res.status(409).json({ error: 'Cannot delete locker with active allotment. Use ?force=true to override.' });
    }
  }

  db.prepare('DELETE FROM lockers WHERE id = ?').run(req.params.id);
  res.status(200).json({ message: 'Locker deleted' });
});

module.exports = router;
