const express = require("express");
const cors = require("cors");

const app = express();
const products = [
  {
    id: 1,
    name: "Classic Tee",
    category: "Apparel",
    price: 29,
  },
  {
    id: 2,
    name: "Running Sneakers",
    category: "Footwear",
    price: 89,
  },
  {
    id: 3,
    name: "Canvas Backpack",
    category: "Accessories",
    price: 64,
  },
];
let cart = [
  {
    id: 1,
    productId: 2,
    qty: 1,
    name: "Running Sneakers",
  },
];

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "ShopSmart Backend is running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/products", (req, res) => {
  const search = req.query.search?.toLowerCase().trim();

  if (!search) {
    return res.json(products);
  }

  const filteredProducts = products.filter((product) =>
    [product.name, product.category].some((value) =>
      value.toLowerCase().includes(search),
    ),
  );

  return res.json(filteredProducts);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find(
    (candidate) => candidate.id === Number(req.params.id),
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.json(product);
});

app.get("/api/cart", (req, res) => {
  res.json(cart);
});

app.post("/api/cart", (req, res) => {
  const { productId, qty = 1 } = req.body;
  const product = products.find(
    (candidate) => candidate.id === Number(productId),
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const cartItem = {
    id: Date.now(),
    productId: product.id,
    qty: Number(qty),
    name: product.name,
  };

  cart = [...cart, cartItem];

  res.status(201).json(cartItem);
});

app.delete("/api/cart/:id", (req, res) => {
  const itemId = Number(req.params.id);
  const itemExists = cart.some((item) => item.id === itemId);

  if (!itemExists) {
    return res.status(404).json({ message: "Cart item not found" });
  }

  cart = cart.filter((item) => item.id !== itemId);
  res.json({ success: true });
});

// Root Route (optional, just to show something)
app.get("/", (req, res) => {
  res.send("ShopSmart Backend Service");
});

module.exports = app;
