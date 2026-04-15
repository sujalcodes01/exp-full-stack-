const express = require("express");
const mongoose = require("mongoose");

const app = express();

// 🔹 Middleware
app.use(express.json());

// 🔹 MongoDB Connection (FIXED ✅)
mongoose.connect("mongodb://127.0.0.1:27017/exp2_2_1")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Error:", err));

// 🔹 Schema & Model
const User = mongoose.model("User", {
    name: String,
    email: String
});

// 🔹 Logging Middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
};

app.use(logger);

// 🔹 Auth Middleware
const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (token === "mysecrettoken") {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized ❌" });
    }
};

// 🔹 Routes

// Public Route
app.get("/", (req, res) => {
    res.send("✅ Public Route Working");
});

// Protected Route
app.get("/protected", auth, (req, res) => {
    res.send("🔒 Protected Route Accessed");
});

// 🔹 Add User
app.post("/add-user", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json({ message: "✅ User Saved", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Get Users
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Error Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong ❌" });
});

// 🔹 Server Start
app.listen(3000, () => {
    console.log("🚀 Server running on port 3000");
});