import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
    },
    bannerImage: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: [
        'Networking',
        'Reunions',
        'Workshops',
        'Career guidance',
        'Guest lectures',
        'Alumni meetups',
      ],
      default: 'Networking',
      index: true,
    },
    startDate: {
      type: Date,
      required: [true, 'Event start date is required'],
      index: true,
    },
    endDate: {
      type: Date,
    },
    venue: {
      type: String,
      required: [true, 'Venue location is required'],
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    registrationDeadline: {
      type: Date,
    },
    capacity: {
      type: Number,
      required: [true, 'Event capacity is required'],
      min: 1,
    },
    registeredCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming',
      index: true,
    },
    organizer: {
      type: String,
      default: 'Alumni Relations Office',
    },
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    speakers: [
      {
        name: String,
        role: String,
      },
    ],
    agenda: [
      {
        time: String,
        title: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Event = mongoose.model('Event', eventSchema);
export default Event;
