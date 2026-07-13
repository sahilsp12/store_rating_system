const express = require("express");
const cors = require("cors");


const authRoutes = require("./routes/auth.routes");
const errorMiddleware = require("./middleware/error.middleware");
const adminRoutes = require("./routes/admin.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Store Rating API is running"
    });
});

app.use(errorMiddleware);

module.exports = app;