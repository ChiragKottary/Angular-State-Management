const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const itemsPath = path.join(__dirname, 'src/assets/items.json');

app.get('/api/items', async (req, res) => {
  try {
    const data = await fs.readFile(itemsPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Error reading items' });
  }
});

app.post('/api/items', async (req, res) => {
  try {
    await fs.writeFile(itemsPath, JSON.stringify(req.body, null, 2));
    res.json(req.body);
  } catch (error) {
    res.status(500).json({ error: 'Error saving items' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 