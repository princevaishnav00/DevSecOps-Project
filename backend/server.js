const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock E-commerce Data
const products = [
  { id: 1, name: 'Wireless Headphones', price: 399.99, category: 'Electronics', image:'/images/Headphones.jpg' },
  { id: 2, name: 'Mechanical Keyboard', price: 220.50, category: 'Computers', image:'/images/Keyboard.jpg' },
  { id: 3, name: 'Gaming Mouse', price: 259.99, category: 'Computers', image:'/images/Mouse.jpg' },
  { id: 4, name: 'Sleek Backpack', price: 545.00, category: 'Accessories', image:'/images/SleekBackpack.jpg' },
];

// In-memory Cart Storage (Would be a DB in production)
let cart = [];

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', service: 'ecommerce-backend' });
});

app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});

// GET: Retrieve all cart items
app.get('/api/cart', (req, res) => {
  res.status(200).json(cart);
});

// POST: Add a product to the cart
app.post('/api/cart', (req, res) => {
  const { productId } = req.body;
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Check if item already in cart to increment or just add
  cart.push({ ...product, cartId: Date.now() }); // Unique ID for cart item
  
  res.status(201).json({ 
    message: `${product.name} added to cart!`,
    cartCount: cart.length 
  });
});

// DELETE: Clear cart or remove item (Optional but useful)
app.delete('/api/cart', (req, res) => {
  cart = [];
  res.status(200).json({ message: 'Cart cleared' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
