import mongoose from 'mongoose';

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
    },

    enrollments: [{
        type: String,
        required:true       
    }]
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});


const BookClubs = mongoose.model('BookClub', BookClubsSchema);

export default BookClubs;