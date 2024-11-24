import mongoose from 'mongoose';

// {
//     id: 1,
//     bookClubName: "Agile Practices Book Club",
//     bookName: "The Phoenix Project",
//     courseName: "Agile Development with Scrum (Udemy)",
//     description: "A club for software developers and engineers to discuss Agile methodologies, Scrum practices, and continuous improvement in development.",
//     organizer: "Diana Prince",
//     noOfAttendees: 10,
//     participants: ["Diana Prince", "Tom Hardy", "Neo Anderson", "Trinity O'Connor", "Morpheus King"],
//     cadence: "Weekly",
//     location: "Online (Slack)",
//     status: "active"
// },


const BookClubsSchema = new mongoose.Schema({
    bookClubName: {
        type: String,
        required: true
    },

    bookName: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    organizer: {
        type: String,
        required: true
    },

    noOfAttendees: {
        type: Number,
        required: true,
        default: 0
    },

    participants: [{
        type: String,
        required: true
    }],

    cadence: {
        type: String,
        required: true,
        // enum: ['aily', 'weekly', 'Bi-weekly', 'Monthly'] // Optional: restrict to specific values
    },

    location: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive', 'completed'],
        default: 'active'
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});


const BookClubs = mongoose.model('BookClub', BookClubsSchema);

export default BookClubs;