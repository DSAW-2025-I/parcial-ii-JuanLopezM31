const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

let products = [
  { id: 1, name: 'shampu rexona', price: 2500 },
  { id: 2, name: 'Lego de batman', price: 400000 },
  { id: 3, name: 'Queso chedar', price: 4250 }
];

app.get('/products', (req, res) => {
  res.json(products);
});
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ error: 'no se encontró el producto' });
  }
  
  res.json(product);
});

app.post('/products', (req, res) => {
  const { id, name, price } = req.body;

  if (!id || !name || !price) {
    return res.status(400).json({ error: 'se necesita que envíes estos datos: id, name, price' });
  }
  const isProduct = products.find(p => p.id === id);
  if (isProduct) {
    return res.status(400).json({ error: 'el id ya existe' });
  }
  const newProduct = { id, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(PORT, () => {
  console.log(`si se desplego en: http://localhost:${PORT}`);
});
