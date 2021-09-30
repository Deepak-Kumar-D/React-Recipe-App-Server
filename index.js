import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes/recipe.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const URL = process.env.MONGODB_URL || "mongodb://localhost/db-recipe";

app.use(cors());

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const con = mongoose.connection;
con.on("open", () => console.log("MongoDB is connected."));

app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {
  console.log(`PORT started @ ${PORT}.`);
});
