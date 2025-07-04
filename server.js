const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");


const userRoutes = require("./routes/user.routes");
const noteRoutes = require("./routes/note.routes");

const app = express();
const PORT = process.env.PORT || 8080;



app.use(cors({
  origin: "*", // 👈 Use "http://localhost:5173" for more strict access
  credentials: true
}));

app.use(express.json());



app.get("/", (req, res) => res.send("Hello World Raj"));

app.use("/", userRoutes);
app.use("/", noteRoutes);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});
