const express = require('express');
const db = require('./src/db');
const { getDashboardHtml } = require('./src/dashboard');
const membersRouter = require('./src/routes/members');
const lockersRouter = require('./src/routes/lockers');
const allotmentsRouter = require('./src/routes/allotments');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Root dashboard and status endpoint
app.get('/', (req, res) => {
  if (req.accepts('html')) {
    const memberCount = db.prepare('SELECT COUNT(*) as count FROM members').get().count;
    const lockerCount = db.prepare('SELECT COUNT(*) as count FROM lockers').get().count;
    const allotmentCount = db.prepare('SELECT COUNT(*) as count FROM allotments').get().count;

    return res.send(getDashboardHtml({ lockerCount, memberCount, allotmentCount }));
  }

  res.status(200).json({
    status: 'online',
    message: 'Welcome to FitNest Gym Locker API',
    endpoints: {
      lockers: '/lockers',
      lockers_floor_filter: '/lockers?floor=Floor 2',
      members: '/members',
      allotments: '/allotments'
    }
  });
});

app.use('/members', membersRouter);
app.use('/lockers', lockersRouter);
app.use('/allotments', allotmentsRouter);

// Catch-all 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error-handling middleware
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed' || (err instanceof SyntaxError && err.status === 400 && 'body' in err)) {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const status = err.status || 500;
  res.status(status).json({
    error: status === 400 ? (err.message || 'Invalid JSON body') : 'Internal server error'
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`FitNest Gym API running on http://localhost:${PORT}`);
  });
}

module.exports = app;
