import express from 'express';
import mongoose from 'mongoose';
import BookClubs from '../models/BookClubs.model.js'

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newBookClub = new BookClubs(req.body);
        const savedBookClub = await newBookClub.save();
        res.status(201).json(savedBookClub);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.get("/", async (req, res) => {
    try {
      const bookClubs = await BookClubs.find();
      res.status(200).json(bookClubs);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch book clubs",
        error: error.message,
      });
    }
});
  
export default router;