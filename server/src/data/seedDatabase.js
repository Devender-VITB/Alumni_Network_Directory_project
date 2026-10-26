import mongoose from 'mongoose';
import config from '../config/env.js';
import User from '../models/User.js';
import AlumniProfile from '../models/AlumniProfile.js';
import Event from '../models/Event.js';
import EventRegistration from '../models/EventRegistration.js';
import { initialUsers, initialAlumniProfiles, initialEvents } from './seedData.js';

const seedDatabase = async () => {
  if (!config.mongoUri) {
    console.error('❌ MONGODB_URI is not defined in server/.env.');
    console.error('Please configure your MongoDB Atlas connection string before running seed.');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(config.mongoUri);
    console.log('Connected! Purging old collections...');

    await Promise.all([
      User.deleteMany({}),
      AlumniProfile.deleteMany({}),
      Event.deleteMany({}),
      EventRegistration.deleteMany({}),
    ]);

    console.log('Seeding initial users...');
    const createdUsers = await User.insertMany(initialUsers);

    console.log('Seeding alumni profiles...');
    // Map userId appropriately if needed
    const alumniToInsert = initialAlumniProfiles.map((p, idx) => {
      const matchingUser = createdUsers[idx % createdUsers.length];
      return {
        ...p,
        userId: matchingUser._id,
      };
    });
    await AlumniProfile.insertMany(alumniToInsert);

    console.log('Seeding events...');
    await Event.insertMany(initialEvents);

    console.log('=======================================================');
    console.log('✅ Database successfully seeded with:');
    console.log(`   - ${createdUsers.length} Users`);
    console.log(`   - ${alumniToInsert.length} Alumni Profiles`);
    console.log(`   - ${initialEvents.length} Events`);
    console.log('=======================================================');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding database:', err.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedDatabase();
