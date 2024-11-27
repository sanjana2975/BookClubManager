// // import mongoose from 'mongoose';

// // const userSchema = new mongoose.Schema({
// //   userName: { type: String, required: true, unique: true },
// //   enrolledBookClubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BookClub' }],
// //   createdBookClubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BookClub' }],
// //   notifications: [
// //     {
// //       message: { type: String, required: true },
// //       isRead: { type: Boolean, default: false }
// //     }
// //   ]
// // }, {
// //     timestamps: true 
// // });

// // const User = mongoose.model('User', userSchema);

// // export default User;
// import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//   userName: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true
//   },
//   userId: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   enrolledBookClubs: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'BookClub'
//   }],
//   createdBookClubs: [{
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'BookClub'
//   }],
//   notifications: [{
//     type: {
//       message: String,
//       bookClubId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'BookClub'
//       },
//       status: {
//         type: String,
//         enum: ['read', 'unread'],
//         default: 'unread'
//       },
//       createdAt: {
//         type: Date,
//         default: Date.now
//       }
//     }
//   }]
// }, {
//   timestamps: true
// });

// export default mongoose.model('User', UserSchema);
// models/User.model.js

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  enrolledBookClubs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookClub'
  }],
  createdBookClubs: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'BookClub'
  }],
  notifications: [{
    type: {
      message: String,
      bookClubId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookClub'
      },
      status: {
        type: String,
        enum: ['read', 'unread'],
        default: 'unread'
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  }]
}, {
  timestamps: true
});

export default mongoose.model('User', UserSchema);
