import express from "express";
import { PORT, mongodburl } from "./config.js";
import mongoose from "mongoose";
import booksroute from "./routes/booksroute.js";
import cors from "cors";
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/books", booksroute);

mongoose
  .connect(mongodburl)
  .then(() => {
    console.log("App connected successfully.....");

    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
