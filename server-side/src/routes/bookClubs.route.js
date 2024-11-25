import express from 'express';
import BookClubs from '../models/BookClubs.model.js'

const router = express.Router();

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBookClub = await BookClubs.findByIdAndDelete(id);
    if (!deletedBookClub) {
      return res.status(404).json({ message: 'Book Club not found' });
    }
    res.status(200).json({ message: 'Book Club deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
      res.status(500).json({ message: error.message });
    }
});

export default router;