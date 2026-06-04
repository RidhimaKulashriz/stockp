require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

if (!uri) {
  console.error("FATAL ERROR: MONGO_URL is not defined in .env file");
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ---------------------- Seed Routes (for initial data setup) ----------------------

// GET /addHoldings - seeds the Holdings collection with sample data
app.get("/addHoldings", async (req, res) => {
  try {
    const token = req.query.token;
    const userId = await validateToken(token);
    
    if (!userId) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const tempHoldings = [
      { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
      { name: "HDFCBANK", qty: 2, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
      { name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.4, net: "+3.49%", day: "+0.21%" },
      { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%", isLoss: true },
      { name: "ITC", qty: 5, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.80%" },
      { name: "KPITTECH", qty: 5, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%" },
      { name: "M&M", qty: 2, avg: 809.9, price: 779.8, net: "-3.72%", day: "-0.01%", isLoss: true },
      { name: "RELIANCE", qty: 1, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%" },
      { name: "SBIN", qty: 4, avg: 324.35, price: 430.2, net: "+32.63%", day: "-0.34%", isLoss: true },
      { name: "SGBMAY29", qty: 2, avg: 4727.0, price: 4719.0, net: "-0.17%", day: "+0.15%" },
      { name: "TATAPOWER", qty: 5, avg: 104.2, price: 124.15, net: "+19.15%", day: "-0.24%", isLoss: true },
      { name: "TCS", qty: 1, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%", isLoss: true },
      { name: "WIPRO", qty: 4, avg: 489.3, price: 577.75, net: "+18.08%", day: "+0.32%" },
    ];

    // Avoid duplicates: clear existing holdings first? Or check each. Let's insert only if not present.
    let insertedCount = 0;
    for (const item of tempHoldings) {
      const exists = await HoldingsModel.findOne({ name: item.name, userId });
      if (!exists) {
        await new HoldingsModel({
          userId,
          name: item.name,
          qty: item.qty,
          avg: item.avg,
          price: item.price,
          net: item.net,
          day: item.day,
          isLoss: item.isLoss || false,
        }).save();
        insertedCount++;
      }
    }
    res.json({ message: `Holdings seeding completed. Inserted ${insertedCount} new records.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to seed holdings" });
  }
});

// GET /addPositions - seeds the Positions collection with sample data
app.get("/addPositions", async (req, res) => {
  try {
    const token = req.query.token;
    const userId = await validateToken(token);
    
    if (!userId) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const tempPositions = [
      { product: "CNC", name: "EVEREADY", qty: 2, avg: 316.27, price: 312.35, net: "+0.58%", day: "-1.24%", isLoss: true },
      { product: "CNC", name: "JUBLFOOD", qty: 1, avg: 3124.75, price: 3082.65, net: "+10.04%", day: "-1.35%", isLoss: true },
    ];

    let insertedCount = 0;
    for (const item of tempPositions) {
      const exists = await PositionsModel.findOne({ name: item.name, userId });
      if (!exists) {
        await new PositionsModel({
          userId,
          product: item.product,
          name: item.name,
          qty: item.qty,
          avg: item.avg,
          price: item.price,
          net: item.net,
          day: item.day,
          isLoss: item.isLoss,
        }).save();
        insertedCount++;
      }
    }
    res.json({ message: `Positions seeding completed. Inserted ${insertedCount} new records.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to seed positions" });
  }
});

// ---------------------- Regular API Routes ----------------------

// Helper function to validate token and get userId
const validateToken = async (token) => {
  if (!token) return null;
  const user = await UserModel.findOne({ token });
  return user ? user._id.toString() : null;
};

app.get("/allHoldings", async (req, res) => {
  try {
    const token = req.query.token;
    const userId = await validateToken(token);
    
    if (!userId) {
      return res.status(401).json({ error: "Invalid token" });
    }
    
    const allHoldings = await HoldingsModel.find({ userId });
    res.json(allHoldings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    const token = req.query.token;
    const userId = await validateToken(token);
    
    if (!userId) {
      return res.status(401).json({ error: "Invalid token" });
    }
    
    const allPositions = await PositionsModel.find({ userId });
    res.json(allPositions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch positions" });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    if (!name || !qty || !price || !mode) {
      return res.status(400).json({ error: "Missing required fields: name, qty, price, mode" });
    }
    const newOrder = new OrdersModel({ name, qty, price, mode });
    await newOrder.save();
    res.json({ message: "Order saved!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save order" });
  }
});

// ---------------------- Authentication Routes ----------------------

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    console.log("SIGNUP REQUEST - Username:", username, "Email:", email);
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    console.log("USER CREATED - Username:", newUser.username, "Email:", newUser.email);
    
    res.status(201).json({ message: "User created successfully", username: newUser.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log("LOGIN REQUEST - Email:", email);
    
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = "simple-token-" + Date.now();
    
    // Store token in user document for validation
    user.token = token;
    await user.save();
    
    console.log("LOGIN SUCCESS - Username:", user.username, "Email:", user.email);
    
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

app.get("/user/profile", async (req, res) => {
  try {
    const token = req.query.token;
    
    console.log("USER PROFILE REQUEST - Token:", token);
    
    if (!token) {
      return res.status(401).json({ error: "Token is required" });
    }

    const user = await UserModel.findOne({ token });

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    console.log("USER PROFILE RETURNED - Username:", user.username, "Email:", user.email);
    
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

// Health check route
app.get("/", (req, res) => {
  res.send("Zerodha Backend is running. Use /allHoldings, /allPositions, /addHoldings, /addPositions, /newOrder");
});

// ---------------------- Start Server Only After DB Connection ----------------------
if (require.main === module) {
  mongoose
    .connect(uri)
    .then(() => {
      console.log(" MongoDB connected");
      app.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
}

// Export for Vercel serverless
module.exports = app;