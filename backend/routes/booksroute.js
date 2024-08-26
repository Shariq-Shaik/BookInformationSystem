import express from "express";
const router = express.Router();
import { Book } from "../models/bookmodel.js";
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(500)
        .send({ message: "send all required fields:author,title,publishyear" });
    }
    const newbook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newbook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
  }
});
router.get("/", async (req, res) => {
  const allbooks = await Book.find({});
  return res.status(200).json({
    count: allbooks.length,
    data: allbooks,
  });
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const item = await Book.findById(id);
  return res.status(200).send(item);
});
router.put("/:id", async (req, res) => {
  const ids = req.params.id;
  if (!req.body.title || !req.body.author || !req.body.publishYear) {
    return res
      .status(500)
      .send({ message: "send all required fields:author,title,publishyear" });
  }
  const result = await Book.findByIdAndUpdate(ids, req.body);

  if (!result) {
    return res.send("No book is found");
  }
  return res.status(200).json({ message: "Book updated succcessfully" });
});
router.delete("/:id", async (req, res) => {
  const id1 = req.params.id;
  const answer = await Book.findByIdAndDelete(id1);
  if (!answer) {
    return res.json({ message: "Book not found" });
  }
  return res.json({
    message: "book information of given id is deleted successfully",
  });
});
export default router;
