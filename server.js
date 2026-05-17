const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const tagRoutes = require("./routes/tagRoutes");
const adminRoutes = require("./routes/adminRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin: "*"
}));


app.use(express.json());


// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/places", require("./routes/placeRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/feed", require("./routes/feedRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/tags", tagRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});


const PORT = process.env.PORT || 5000;

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});