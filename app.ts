import express, { Application } from "express";
import mongoose from "mongoose";
import postRouter from "./routes/postRoutes";
import bodyParser from "body-parser";

const app: Application = express();
const port: number = parseInt(process.env.PORT || "3000");
const databaseUrl: string = process.env.DATABASE_URL || "";

app.use(bodyParser.json());
app.use("/posts", postRouter);


mongoose.connect(databaseUrl);
const db = mongoose.connection;

db.on("error", (error: Error) => {
  console.error("Error connecting to MongoDB", error);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});