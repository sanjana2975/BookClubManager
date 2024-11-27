import express from 'express';
import BookClubs from '../models/BookClubs.model.js';
import User from '../models/User.model.js';

const router = express.Router();

// Endpoint for user to request enrollment in a book club
router.post('/enroll/:id', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body; // Assume userId is passed in the body

    try {
        // Find the book club
        const bookClub = await BookClubs.findById(id);
        if (!bookClub) {
            return res.status(404).json({ message: 'Book Club not found' });
        }

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create notification for the organizer
        const notification = {
            message: `${user.userName} has requested to enroll in ${bookClub.bookClubName}`,
            id: bookClub._id,
            status: 'unread',
        };

        // Send the notification to the book club's organizer
        const organizer = await User.findOne({ userName: bookClub.organizer });
        if (organizer) {
            organizer.notifications.push(notification);
            await organizer.save();
            res.status(200).json({ message: 'Request sent to organizer' });
        } else {
            res.status(404).json({ message: 'Organizer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint for the organizer to accept/reject enrollment
router.post('/response/:id', async (req, res) => {
  const { id } = req.params;
  const { userId, action } = req.body; // action: 'accept' or 'reject'

  try {
      const bookClub = await BookClubs.findById(id);
      if (!bookClub) {
          return res.status(404).json({ message: 'Book Club not found' });
      }

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      if (action === 'accept') {
          // Add user to book club's participants
          bookClub.participants.push(userId);
          bookClub.noOfAttendees += 1;

          // Update the user's enrolledBookClubs list
          user.enrolledBookClubs.push(id);

          // Remove the notification from the user's inbox
          const notificationIndex = user.notifications.findIndex(
              (notif) => notif.id.toString() === id.toString()
          );
          if (notificationIndex > -1) {
              user.notifications[notificationIndex].status = 'read';
              await user.save();
          }

          await bookClub.save();
          res.status(200).json({ message: 'User enrolled successfully' });
      } else if (action === 'reject') {
          // Optionally, notify the user that their request was rejected (optional)
          res.status(200).json({ message: 'Enrollment request rejected' });
      } else {
          res.status(400).json({ message: 'Invalid action' });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

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