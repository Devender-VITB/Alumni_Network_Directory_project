import mongoose from 'mongoose';
import User from '../models/User.js';
import AlumniProfile from '../models/AlumniProfile.js';
import Event from '../models/Event.js';
import EventRegistration from '../models/EventRegistration.js';
import { initialUsers, initialAlumniProfiles, initialEvents } from '../data/seedData.js';

// In-Memory store for Demo / Offline Mode
let memoryUsers = [...initialUsers];
let memoryAlumni = [...initialAlumniProfiles];
let memoryEvents = [...initialEvents];
let memoryRegistrations = [{ eventId: 'evt-201', userId: 'usr-101', registeredAt: new Date() }];

const isMongoActive = () => mongoose.connection.readyState === 1;

export const dataRepository = {
  // USER METHODS
  async findUserByEmail(email, includePassword = false) {
    const cleanEmail = email.trim().toLowerCase();
    if (isMongoActive()) {
      const q = User.findOne({ email: cleanEmail });
      if (includePassword) q.select('+passwordHash');
      return await q.exec();
    }
    const found = memoryUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!found) return null;
    const clone = { ...found };
    if (!includePassword) delete clone.passwordHash;
    return clone;
  },

  async findUserById(id) {
    if (isMongoActive()) {
      return await User.findById(id).exec();
    }
    const found = memoryUsers.find((u) => u.id === id || u._id === id);
    if (!found) return null;
    const clone = { ...found };
    delete clone.passwordHash;
    return clone;
  },

  async createUser(userData) {
    if (isMongoActive()) {
      return await User.create(userData);
    }
    const newUser = {
      id: 'usr-' + Date.now(),
      isActive: true,
      role: userData.role || 'user',
      createdAt: new Date().toISOString(),
      ...userData,
    };
    memoryUsers.push(newUser);
    const clone = { ...newUser };
    delete clone.passwordHash;
    return clone;
  },

  // ALUMNI METHODS
  async queryAlumni(params = {}) {
    const {
      search = '',
      department = '',
      graduationYear = '',
      industry = '',
      degree = '',
      country = '',
      skill = '',
      mentorship = '',
      sort = 'name_asc',
      page = 1,
      limit = 9,
    } = params;

    if (isMongoActive()) {
      const query = {};
      if (department) query.department = department;
      if (graduationYear) query.graduationYear = Number(graduationYear);
      if (industry) query.industry = industry;
      if (degree) query.degree = degree;
      if (country) query.country = country;
      if (skill) query.skills = skill;
      if (mentorship === 'true') query.mentorshipAvailable = true;

      if (search.trim()) {
        query.$text = { $search: search.trim() };
      }

      const sortMap = {
        name_asc: { fullName: 1 },
        name_desc: { fullName: -1 },
        year_desc: { graduationYear: -1 },
        year_asc: { graduationYear: 1 },
      };

      const pageNum = Math.max(1, parseInt(page, 10));
      const limitNum = Math.max(1, parseInt(limit, 10));
      const skip = (pageNum - 1) * limitNum;

      const [items, total] = await Promise.all([
        AlumniProfile.find(query)
          .sort(sortMap[sort] || { fullName: 1 })
          .skip(skip)
          .limit(limitNum)
          .exec(),
        AlumniProfile.countDocuments(query),
      ]);

      const totalPages = Math.ceil(total / limitNum) || 1;
      return {
        items,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages,
          hasNext: pageNum < totalPages,
          hasPrev: pageNum > 1,
        },
      };
    }

    // In-memory query logic
    let list = [...memoryAlumni];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (a) =>
          a.fullName.toLowerCase().includes(q) ||
          a.currentCompany.toLowerCase().includes(q) ||
          a.currentJobTitle.toLowerCase().includes(q) ||
          a.department.toLowerCase().includes(q) ||
          a.location.toLowerCase().includes(q) ||
          a.skills?.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (department) list = list.filter((a) => a.department === department);
    if (graduationYear) list = list.filter((a) => a.graduationYear === Number(graduationYear));
    if (industry) list = list.filter((a) => a.industry === industry);
    if (degree) list = list.filter((a) => a.degree === degree);
    if (country) list = list.filter((a) => a.country === country);
    if (skill) list = list.filter((a) => a.skills?.includes(skill));
    if (mentorship === 'true') list = list.filter((a) => a.mentorshipAvailable === true);

    switch (sort) {
      case 'name_asc':
        list.sort((a, b) => a.fullName.localeCompare(b.fullName));
        break;
      case 'name_desc':
        list.sort((a, b) => b.fullName.localeCompare(a.fullName));
        break;
      case 'year_desc':
        list.sort((a, b) => b.graduationYear - a.graduationYear);
        break;
      case 'year_asc':
        list.sort((a, b) => a.graduationYear - b.graduationYear);
        break;
      default:
        list.sort((a, b) => a.fullName.localeCompare(b.fullName));
    }

    const total = list.length;
    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, parseInt(limit, 10));
    const totalPages = Math.ceil(total / limitNum) || 1;
    const startIndex = (pageNum - 1) * limitNum;
    const items = list.slice(startIndex, startIndex + limitNum);

    return {
      items,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1,
      },
    };
  },

  async getAlumniById(id) {
    if (isMongoActive()) {
      return await AlumniProfile.findOne({
        $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { userId: mongoose.isValidObjectId(id) ? id : null }],
      }).exec();
    }
    return memoryAlumni.find((a) => a.id === id || a.userId === id) || null;
  },

  async updateAlumniProfile(id, updateData) {
    // Prevent privilege escalation or unauthorized ID mutations
    delete updateData._id;
    delete updateData.userId;
    delete updateData.role;

    if (isMongoActive()) {
      return await AlumniProfile.findOneAndUpdate(
        { $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { userId: mongoose.isValidObjectId(id) ? id : null }] },
        { $set: updateData },
        { new: true, runValidators: true }
      ).exec();
    }

    const index = memoryAlumni.findIndex((a) => a.id === id || a.userId === id);
    if (index === -1) return null;
    memoryAlumni[index] = { ...memoryAlumni[index], ...updateData, updatedAt: new Date().toISOString() };
    return memoryAlumni[index];
  },

  async deleteAlumniProfile(id) {
    if (isMongoActive()) {
      return await AlumniProfile.findByIdAndDelete(id).exec();
    }
    const initialLen = memoryAlumni.length;
    memoryAlumni = memoryAlumni.filter((a) => a.id !== id);
    return memoryAlumni.length < initialLen;
  },

  // EVENT METHODS
  async queryEvents(params = {}) {
    const { category, search } = params;

    if (isMongoActive()) {
      const q = {};
      if (category && category !== 'All') q.category = category;
      if (search) q.title = { $regex: search, $options: 'i' };
      return await Event.find(q).sort({ startDate: 1 }).exec();
    }

    let list = [...memoryEvents];
    if (category && category !== 'All') list = list.filter((e) => e.category === category);
    if (search) {
      const term = search.toLowerCase();
      list = list.filter((e) => e.title.toLowerCase().includes(term) || e.description.toLowerCase().includes(term));
    }
    return list;
  },

  async getEventById(id) {
    if (isMongoActive()) {
      if (!mongoose.isValidObjectId(id)) return null;
      return await Event.findById(id).exec();
    }
    return memoryEvents.find((e) => e.id === id) || null;
  },

  async registerUserForEvent(eventId, userId) {
    if (isMongoActive()) {
      const existing = await EventRegistration.findOne({ eventId, userId });
      if (existing) {
        throw new Error('You are already registered for this event.');
      }
      const reg = await EventRegistration.create({ eventId, userId, status: 'confirmed' });
      await Event.findByIdAndUpdate(eventId, { $inc: { registeredCount: 1 } });
      return reg;
    }

    const alreadyRegistered = memoryRegistrations.some(
      (r) => r.eventId === eventId && r.userId === userId
    );
    if (alreadyRegistered) {
      throw new Error('You are already registered for this event.');
    }
    const newReg = { eventId, userId, status: 'confirmed', registeredAt: new Date() };
    memoryRegistrations.push(newReg);
    const ev = memoryEvents.find((e) => e.id === eventId);
    if (ev) ev.registeredCount += 1;
    return newReg;
  },

  async cancelEventRegistration(eventId, userId) {
    if (isMongoActive()) {
      const res = await EventRegistration.findOneAndDelete({ eventId, userId });
      if (res) {
        await Event.findByIdAndUpdate(eventId, { $inc: { registeredCount: -1 } });
      }
      return res;
    }

    memoryRegistrations = memoryRegistrations.filter(
      (r) => !(r.eventId === eventId && r.userId === userId)
    );
    const ev = memoryEvents.find((e) => e.id === eventId);
    if (ev && ev.registeredCount > 0) ev.registeredCount -= 1;
    return true;
  },

  // ADMIN STATS
  async getSystemStats() {
    if (isMongoActive()) {
      const [alumniCount, userCount, eventsCount] = await Promise.all([
        AlumniProfile.countDocuments(),
        User.countDocuments(),
        Event.countDocuments(),
      ]);
      return {
        totalAlumni: alumniCount,
        totalUsers: userCount,
        upcomingEvents: eventsCount,
        totalRegistrations: 1098,
      };
    }

    const batches = new Set(memoryAlumni.map((a) => a.graduationYear)).size;
    const industries = new Set(memoryAlumni.map((a) => a.industry)).size;
    const countries = new Set(memoryAlumni.map((a) => a.country)).size;

    return {
      totalAlumni: memoryAlumni.length,
      graduatingBatches: batches,
      industriesRepresented: industries,
      countriesReached: countries,
      upcomingEvents: memoryEvents.length,
      activeMentors: memoryAlumni.filter((a) => a.mentorshipAvailable).length,
    };
  },
};

export default dataRepository;
