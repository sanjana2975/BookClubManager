import mongoose from 'mongoose';

const CourseContentSchema = new mongoose.Schema({
    bookClub: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookClub',
        required: true
    },
    chapters: [{
        chapterName: {
            type: String,
            required: true
        },
        facilitator: {
            type: String,
            required: true
        },
        notesLink: {
            type: String,
            required: true
        },
        recordingLink: {
            type: String,
            required: false
        }
    }]
}, {
    timestamps: true

})

const CourseContent = mongoose.model('CourseContent', CourseContentSchema);

export default CourseContent;