const express = require('express');
const membersRouter = require('./src/routes/members');
const lockersRouter = require('./src/routes/lockers');
const allotmentsRouter = require('./src/routes/allotments');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/members', membersRouter);
app.use('/lockers', lockersRouter);
app.use('/allotments', allotmentsRouter);

app.listen(PORT, () => {
  console.log(`FitNest Gym API running on http://localhost:${PORT}`);
});
