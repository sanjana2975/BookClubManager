import { config } from "dotenv";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
// import BookClubs from "./models/BookClubs.model.js"; // Make sure to import your model
import router from "./routes/bookClubs.route.js"
import CourseContentRouter from "./routes/courseContent.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());

app.use(express.json());

// Routes for creating and managing bookClubs
app.use('/api/bookclubs', router);


//Routes for creating and managing CourseContent

app.use('/api/contents', CourseContentRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server is up on port ${port}!`);
});

