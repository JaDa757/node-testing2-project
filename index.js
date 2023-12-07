const express = require('express');
const db = require('./db-config');

const app = express();
app.use(express.json());

// Example endpoint
app.get('/', async (req, res) => {
  try {
    const data = await db('resource').select('*');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
