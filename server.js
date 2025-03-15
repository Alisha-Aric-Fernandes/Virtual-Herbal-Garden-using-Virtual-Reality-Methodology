import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import cors from 'cors';
import CategoryRoute from './routes/CategoryRoute.js'
import PlantRoute from './routes/PlantRoute.js';
import NoteRoute from './routes/NoteRoute.js';


//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// app.use((req, res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.url}`);
//   next();
// });


//routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', CategoryRoute);
app.use('/api/v1/plant', PlantRoute);
app.use('/api/v1/notes', NoteRoute);



//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to VHG app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});



