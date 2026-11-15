const express = require('express');
const db = require('../db');
const { validateMember } = require('../validation');

const router = express.Router();

// GET /members
router.get('/', (req, res) => {
  res.status(200).json(db.prepare('SELECT * FROM members').all());
});

// GET /members/:id
router.get('/:id', (req, res) => {
  const member = db.prepare('SELECT * FROM members WHERE id = ?').get(req.params.id);
  if (!member) {
    return res.status(404).json({ error: 'Member not found' });
  }
  res.status(200).json(member);
});

// POST /members
router.post('/', (req, res) => {
  const error = validateMember(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  const result = db.prepare('INSERT INTO members (name) VALUES (?)').run(req.body.name.trim());
  const created = db.prepare('SELECT * FROM members WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(created);
});

// PUT /members/:id
router.put('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM members WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Member not found' });
  }

  const error = validateMember(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  db.prepare('UPDATE members SET name = ? WHERE id = ?').run(req.body.name.trim(), req.params.id);
  const updated = db.prepare('SELECT * FROM members WHERE id = ?').get(req.params.id);
  res.status(200).json(updated);
});

// DELETE /members/:id
// Returns 409 if the member still has active allotments
router.delete('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM members WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Member not found' });
  }

  const allotment = db.prepare('SELECT id FROM allotments WHERE member_id = ?').get(req.params.id);
  if (allotment) {
    return res.status(409).json({ error: 'Cannot delete member with active allotment' });
  }

  db.prepare('DELETE FROM members WHERE id = ?').run(req.params.id);
  res.status(200).json({ message: 'Member deleted' });
});

module.exports = router;
