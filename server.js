const express = require('express');
const db = require('./src/db');
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

    return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FitNest Gym – Locker Room API</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 2.5rem 1rem; display: flex; justify-content: center; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 2rem; max-width: 650px; width: 100%; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    h1 { margin: 0; color: #38bdf8; font-size: 1.75rem; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
    .status { display: inline-flex; align-items: center; gap: 6px; background: #064e3b; color: #34d399; padding: 4px 12px; border-radius: 20px; font-weight: 600; font-size: 0.85rem; }
    .status-dot { width: 8px; height: 8px; background: #34d399; border-radius: 50%; }
    .desc { color: #94a3b8; line-height: 1.5; margin: 0 0 1.5rem 0; font-size: 0.95rem; }
    .endpoints { display: grid; gap: 0.75rem; }
    .endpoint { display: flex; justify-content: space-between; align-items: center; background: #334155; padding: 0.85rem 1rem; border-radius: 8px; text-decoration: none; color: #f8fafc; transition: all 0.2s; border: 1px solid transparent; }
    .endpoint:hover { background: #475569; border-color: #38bdf8; transform: translateY(-1px); }
    .badge { background: #0284c7; color: white; padding: 3px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 600; }
    .method { background: #059669; color: white; padding: 2px 7px; border-radius: 4px; font-size: 0.75rem; font-weight: bold; margin-right: 10px; }
    code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; color: #bae6fd; font-size: 0.95rem; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>FitNest Gym API</h1>
      <span class="status"><span class="status-dot"></span> Live</span>
    </div>
    <p class="desc">Express & SQLite locker allocation management service. Click any endpoint below to inspect the live JSON response:</p>
    <div class="endpoints">
      <a class="endpoint" href="/lockers">
        <div><span class="method">GET</span><code>/lockers</code></div>
        <span class="badge">${lockerCount} lockers</span>
      </a>
      <a class="endpoint" href="/lockers?floor=Floor%202">
        <div><span class="method">GET</span><code>/lockers?floor=Floor 2</code></div>
        <span class="badge">Floor 2 Filter</span>
      </a>
      <a class="endpoint" href="/members">
        <div><span class="method">GET</span><code>/members</code></div>
        <span class="badge">${memberCount} members</span>
      </a>
      <a class="endpoint" href="/allotments">
        <div><span class="method">GET</span><code>/allotments</code></div>
        <span class="badge">${allotmentCount} allotments</span>
      </a>
    </div>
  </div>
</body>
</html>`);
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

app.listen(PORT, () => {
  console.log(`FitNest Gym API running on http://localhost:${PORT}`);
});
