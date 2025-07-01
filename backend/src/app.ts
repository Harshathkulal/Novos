import express from 'express';

const app = express();

app.use(express.json());
app.use('/api', (req, res,) => {
  res.json({ message: 'Hello from api' });
});

export default app;
