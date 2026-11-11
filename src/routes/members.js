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

module.exports = router;
