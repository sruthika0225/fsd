const express = require("express");
const session = require("express-session");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
  }),
);

const users = {};

const products = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Headphones", price: 100 },
  { id: 3, name: "Keyboard", price: 80 },
];

// Register
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (users[username]) {
    return res.send("User already exists");
  }

  users[username] = { password, cart: [] };
  res.send("Registration successful");
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (users[username] && users[username].password === password) {
    req.session.user = username;
    res.send("Login successful");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// Get products
app.get("/products", (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  res.json(products);
});

// Add to cart
app.post("/add-to-cart", (req, res) => {
  const user = users[req.session.user];
  if (!user) return res.sendStatus(401);

  const product = products.find((p) => p.id === Number(req.body.id));

  if (product) user.cart.push(product);
  res.send("Added to cart");
});

// View cart
app.get("/cart", (req, res) => {
  const user = users[req.session.user];
  if (!user) return res.sendStatus(401);

  res.json(user.cart);
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("Logged out");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
