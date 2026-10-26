import mongoose from 'mongoose';

const alumniProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    headline: {
      type: String,
      trim: true,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    profileImage: {
      type: String,
      default: '',
    },
    graduationYear: {
      type: Number,
      required: [true, 'Graduation year is required'],
      min: 1950,
      max: 2030,
      index: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      index: true,
    },
    degree: {
      type: String,
      required: [true, 'Degree is required'],
    },
    currentJobTitle: {
      type: String,
      default: '',
      trim: true,
    },
    currentCompany: {
      type: String,
      default: '',
      trim: true,
      index: true,
    },
    industry: {
      type: String,
      default: 'Technology',
      index: true,
    },
    location: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
      index: true,
    },
    skills: {
      type: [String],
      default: [],
      index: true,
    },
    experience: [
      {
        title: String,
        company: String,
        location: String,
        startDate: String,
        endDate: String,
        isCurrent: Boolean,
        description: String,
      },
    ],
    education: [
      {
        institution: String,
        degree: String,
        fieldOfStudy: String,
        startYear: Number,
        endYear: Number,
      },
    ],
    achievements: [String],
    certifications: [
      {
        name: String,
        issuer: String,
        issueDate: String,
        url: String,
      },
    ],
    projects: [
      {
        title: String,
        description: String,
        link: String,
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
      index: true,
    },
    mentorshipAvailable: {
      type: Boolean,
      default: false,
      index: true,
    },
    mentorshipTopics: {
      type: [String],
      default: [],
    },
    profileVisibility: {
      type: String,
      enum: ['public', 'alumni_only', 'private'],
      default: 'public',
    },
    contactSharingPreferences: {
      email: { type: Boolean, default: false },
      phone: { type: Boolean, default: false },
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      portfolio: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
  }
);

// Compound text index for search
alumniProfileSchema.index({
  fullName: 'text',
  currentCompany: 'text',
  currentJobTitle: 'text',
  skills: 'text',
  bio: 'text',
  location: 'text',
});

export const AlumniProfile = mongoose.model('AlumniProfile', alumniProfileSchema);
export default AlumniProfile;
