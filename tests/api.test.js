process.env.DB_FILE = ':memory:';

const request = require('supertest');
const app = require('../server');
const db = require('../src/db');

describe('FitNest Gym Locker API', () => {
  beforeEach(() => {
    db.prepare('DELETE FROM allotments').run();
    db.prepare('DELETE FROM lockers').run();
    db.prepare('DELETE FROM members').run();
  });

  // 1. Create locker
  test('POST /lockers creates a new locker and returns 201', async () => {
    const res = await request(app)
      .post('/lockers')
      .send({ name: 'L-101', floor: 'Floor 1' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('L-101');
    expect(res.body.floor).toBe('Floor 1');
  });

  // 2. Get locker
  test('GET /lockers/:id returns the locker and 200', async () => {
    const created = await request(app)
      .post('/lockers')
      .send({ name: 'L-102', floor: 'Floor 2' });
    const res = await request(app).get(`/lockers/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(created.body.id);
    expect(res.body.name).toBe('L-102');
  });

  // 3. Update locker
  test('PUT /lockers/:id updates locker details and returns 200', async () => {
    const created = await request(app)
      .post('/lockers')
      .send({ name: 'L-103', floor: 'Floor 1' });
    const res = await request(app)
      .put(`/lockers/${created.body.id}`)
      .send({ name: 'L-103-renamed', floor: 'Floor 3' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('L-103-renamed');
    expect(res.body.floor).toBe('Floor 3');
  });

  // 4. Delete locker
  test('DELETE /lockers/:id removes the locker and returns 200', async () => {
    const created = await request(app)
      .post('/lockers')
      .send({ name: 'L-104', floor: 'Floor 1' });
    const res = await request(app).delete(`/lockers/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Locker deleted');

    const check = await request(app).get(`/lockers/${created.body.id}`);
    expect(check.status).toBe(404);
  });

  // 5. Invalid floor returns 400
  test('POST /lockers with invalid floor returns 400 with allowed values message', async () => {
    const res = await request(app)
      .post('/lockers')
      .send({ name: 'L-BadFloor', floor: 'Floor 4' });
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('Floor 1, Floor 2, Floor 3');
  });

  // 6. Missing name returns 400
  test('POST /lockers with missing or empty name returns 400', async () => {
    const res1 = await request(app)
      .post('/lockers')
      .send({ floor: 'Floor 1' });
    expect(res1.status).toBe(400);
    expect(res1.body.error).toBe('name is required');

    const res2 = await request(app)
      .post('/lockers')
      .send({ name: '   ', floor: 'Floor 1' });
    expect(res2.status).toBe(400);
    expect(res2.body.error).toBe('name is required');
  });

  // 7. GET /lockers?floor=Floor 2 filters correctly
  test('GET /lockers?floor=Floor 2 filters lockers correctly', async () => {
    await request(app).post('/lockers').send({ name: 'L-F1', floor: 'Floor 1' });
    await request(app).post('/lockers').send({ name: 'L-F2', floor: 'Floor 2' });
    await request(app).post('/lockers').send({ name: 'L-F3', floor: 'Floor 3' });

    const res = await request(app).get('/lockers?floor=Floor%202');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('L-F2');
    expect(res.body[0].floor).toBe('Floor 2');
  });

  // 8. Invalid floor filter returns 400
  test('GET /lockers?floor=Other returns 400 with allowed values', async () => {
    const res = await request(app).get('/lockers?floor=Other');
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('Floor 1, Floor 2, Floor 3');
  });

  // 9. Creating a member
  test('POST /members creates a member and returns 201', async () => {
    const res = await request(app)
      .post('/members')
      .send({ name: 'Alice Smith' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Alice Smith');
  });

  // 10. Allotting a free locker returns 201
  test('POST /allotments allots a free locker and returns 201', async () => {
    const member = await request(app).post('/members').send({ name: 'Bob' });
    const locker = await request(app).post('/lockers').send({ name: 'L-Bob', floor: 'Floor 1' });

    const res = await request(app)
      .post('/allotments')
      .send({ member_id: member.body.id, locker_id: locker.body.id });
    expect(res.status).toBe(201);
    expect(res.body.member_name).toBe('Bob');
    expect(res.body.locker_name).toBe('L-Bob');
    expect(res.body.floor).toBe('Floor 1');
  });

  // 11. Allotting an already-taken locker returns 400
  test('POST /allotments for an already-taken locker returns 400', async () => {
    const member1 = await request(app).post('/members').send({ name: 'Member1' });
    const member2 = await request(app).post('/members').send({ name: 'Member2' });
    const locker = await request(app).post('/lockers').send({ name: 'L-Shared', floor: 'Floor 1' });

    await request(app)
      .post('/allotments')
      .send({ member_id: member1.body.id, locker_id: locker.body.id });

    const res2 = await request(app)
      .post('/allotments')
      .send({ member_id: member2.body.id, locker_id: locker.body.id });
    expect(res2.status).toBe(400);
    expect(res2.body.error).toBe('This locker is already allotted to a member');
  });

  // 12. Unknown member/locker id returns 404
  test('POST /allotments returns 404 when member or locker id does not exist', async () => {
    const locker = await request(app).post('/lockers').send({ name: 'L-Valid', floor: 'Floor 1' });
    const member = await request(app).post('/members').send({ name: 'ValidMember' });

    const badMember = await request(app)
      .post('/allotments')
      .send({ member_id: 99999, locker_id: locker.body.id });
    expect(badMember.status).toBe(404);
    expect(badMember.body.error).toBe('Member not found');

    const badLocker = await request(app)
      .post('/allotments')
      .send({ member_id: member.body.id, locker_id: 99999 });
    expect(badLocker.status).toBe(404);
    expect(badLocker.body.error).toBe('Locker not found');
  });

  // 13. DELETE /allotments/:id
  test('DELETE /allotments/:id releases the locker and returns 200', async () => {
    const member = await request(app).post('/members').send({ name: 'Carol' });
    const locker = await request(app).post('/lockers').send({ name: 'L-Carol', floor: 'Floor 2' });

    const allotment = await request(app)
      .post('/allotments')
      .send({ member_id: member.body.id, locker_id: locker.body.id });

    const del = await request(app).delete(`/allotments/${allotment.body.id}`);
    expect(del.status).toBe(200);
    expect(del.body).toHaveProperty('message', 'Allotment deleted');

    // Locker is now free and can be allotted again
    const member2 = await request(app).post('/members').send({ name: 'Dave' });
    const reAllot = await request(app)
      .post('/allotments')
      .send({ member_id: member2.body.id, locker_id: locker.body.id });
    expect(reAllot.status).toBe(201);
  });

  // 14. GET /allotments/:id
  test('GET /allotments/:id returns allotment details or 404', async () => {
    const member = await request(app).post('/members').send({ name: 'Eve' });
    const locker = await request(app).post('/lockers').send({ name: 'L-Eve', floor: 'Floor 3' });
    const allotment = await request(app)
      .post('/allotments')
      .send({ member_id: member.body.id, locker_id: locker.body.id });

    const res = await request(app).get(`/allotments/${allotment.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.member_name).toBe('Eve');
    expect(res.body.locker_name).toBe('L-Eve');

    const notFound = await request(app).get('/allotments/99999');
    expect(notFound.status).toBe(404);
  });

  // 15. PUT /members/:id
  test('PUT /members/:id updates member name or returns 404/400', async () => {
    const member = await request(app).post('/members').send({ name: 'Frank' });

    const updated = await request(app)
      .put(`/members/${member.body.id}`)
      .send({ name: 'Franklin' });
    expect(updated.status).toBe(200);
    expect(updated.body.name).toBe('Franklin');

    const invalid = await request(app)
      .put(`/members/${member.body.id}`)
      .send({ name: '' });
    expect(invalid.status).toBe(400);

    const notFound = await request(app)
      .put('/members/99999')
      .send({ name: 'Nobody' });
    expect(notFound.status).toBe(404);
  });

  // 16. DELETE /members/:id with 409 check
  test('DELETE /members/:id returns 409 if member has active allotments', async () => {
    const member = await request(app).post('/members').send({ name: 'Grace' });
    const locker = await request(app).post('/lockers').send({ name: 'L-Grace', floor: 'Floor 1' });
    await request(app)
      .post('/allotments')
      .send({ member_id: member.body.id, locker_id: locker.body.id });

    const delActive = await request(app).delete(`/members/${member.body.id}`);
    expect(delActive.status).toBe(409);
    expect(delActive.body.error).toContain('active allotment');

    const otherMember = await request(app).post('/members').send({ name: 'Heidi' });
    const delFree = await request(app).delete(`/members/${otherMember.body.id}`);
    expect(delFree.status).toBe(200);
    expect(delFree.body.message).toBe('Member deleted');
  });

  // 17. Locker name UNIQUE constraint (409)
  test('POST /lockers and PUT /lockers/:id return 409 for duplicate locker name', async () => {
    await request(app).post('/lockers').send({ name: 'L-Unique', floor: 'Floor 1' });
    const dup = await request(app).post('/lockers').send({ name: 'L-Unique', floor: 'Floor 2' });
    expect(dup.status).toBe(409);
    expect(dup.body.error).toBe('Locker name already exists');

    const another = await request(app).post('/lockers').send({ name: 'L-Other', floor: 'Floor 1' });
    const dupUpdate = await request(app)
      .put(`/lockers/${another.body.id}`)
      .send({ name: 'L-Unique', floor: 'Floor 1' });
    expect(dupUpdate.status).toBe(409);
    expect(dupUpdate.body.error).toBe('Locker name already exists');
  });

  // 18. DELETE /lockers/:id with active allotment requires ?force=true
  test('DELETE /lockers/:id returns 409 with allotment, succeeds with ?force=true', async () => {
    const member = await request(app).post('/members').send({ name: 'Ian' });
    const locker = await request(app).post('/lockers').send({ name: 'L-Ian', floor: 'Floor 1' });
    await request(app)
      .post('/allotments')
      .send({ member_id: member.body.id, locker_id: locker.body.id });

    const delBlocked = await request(app).delete(`/lockers/${locker.body.id}`);
    expect(delBlocked.status).toBe(409);
    expect(delBlocked.body.error).toContain('force=true');

    const delForced = await request(app).delete(`/lockers/${locker.body.id}?force=true`);
    expect(delForced.status).toBe(200);
    expect(delForced.body.message).toBe('Locker deleted');
  });

  // 19. Catch-all 404 handler
  test('Undefined routes return 404 with { error: "Route not found" }', async () => {
    const res = await request(app).get('/unknown-endpoint');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Route not found' });
  });

  // 20. Malformed JSON handling
  test('Malformed JSON returns 400 with { error: "Invalid JSON body" }', async () => {
    const res = await request(app)
      .post('/lockers')
      .set('Content-Type', 'application/json')
      .send('{"name": "BadJSON", floor:');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid JSON body' });
  });

  afterAll(() => {
    db.close();
  });
});

