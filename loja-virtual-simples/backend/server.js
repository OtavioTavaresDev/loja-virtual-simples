const express = require('express');
const cors = require('cors');
const products = require('./products');

const app = express();
app.use(cors());
const PORT = 3001;

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/search', (req, res) => {
  const query = req.query.q.toLowerCase();
  const results = products.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.description.toLowerCase().includes(query)
  );
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
