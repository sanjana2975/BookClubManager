import express from 'express';
import mongoose from 'mongoose';
import CourseContent from '../models/CourseContent.model.js'


const CourseContentRouter = express.Router();

CourseContentRouter.post('/', async (req, res) => {

    try {
        // Check if a document already exists for this bookClub
        const objectId = new mongoose.Types.ObjectId(req.body.bookClub);
        const existingContent = await CourseContent.findOne({ 
            bookClub: objectId
        });

        let savedCourseContent;

        if (existingContent) {
            // If exists, update the existing document
            existingContent.chapters = req.body.chapters;
            savedCourseContent = await existingContent.save();
            res.status(200).json({
                message: "Course content updated successfully",
                data: savedCourseContent
            });
        } else {
            // If doesn't exist, create a new document
            const newCourseContent = new CourseContent(req.body);
            savedCourseContent = await newCourseContent.save();
            res.status(201).json({
                message: "Course content created successfully",
                data: savedCourseContent
            });
        }
    } catch (error) {
        // Send more specific error messages based on the error type
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: "Validation Error",
                details: error.message
            });
        }
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                message: "Invalid BookClub ID format",
                details: error.message
            });
        }

        res.status(500).json({
            message: "Internal Server Error",
            details: error.message
        });
    }

})

CourseContentRouter.get("/", async (req, res) => {
    try {
      const currentCourseContent = await CourseContent.find();
      res.status(200).json(currentCourseContent);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch book clubs",
        error: error.message
      });
    }
});

CourseContentRouter.get("/:bookClubId", async (req, res) => {
    try {
        //const { BookClubId } = req.params.bookClubId;
        console.log(req.params.bookClubId);
        const allContents = await CourseContent.find({});
        console.log('All contents in database:', allContents);
        const objectId = new mongoose.Types.ObjectId(req.params.bookClubId);
        console.log(objectId);
        const currentCourseContent = await CourseContent.findOne({bookClub:objectId});
        res.status(200).json(currentCourseContent);
        
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch book club content",
            error: error.message,
        });
    }

});


  
export default CourseContentRouter;