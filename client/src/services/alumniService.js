import api from './api';
import { mockAlumni, getFilterOptions } from '../data/mockAlumniData';

export const alumniService = {
  // Query alumni with multi-criteria filters, search, sorting and pagination
  async getAlumni(params = {}) {
    if (import.meta.env.MODE === 'test') {
      return filterLocalAlumni(params);
    }
    try {
      const response = await api.get('/alumni', { params });
      if (response && response.success) {
        return response.data;
      }
      throw new Error('Fallback to local repository');
    } catch (err) {
      // In-memory fallback if backend is offline or in mock dev mode
      return filterLocalAlumni(params);
    }
  },

  // Retrieve single alumni profile by ID
  async getAlumniById(id) {
    if (import.meta.env.MODE === 'test') {
      const found = mockAlumni.find(a => a.id === id || a.userId === id);
      if (!found) throw new Error('Alumni profile not found');
      return found;
    }
    try {
      const response = await api.get(`/alumni/${id}`);
      if (response && response.success) {
        return response.data;
      }
      throw new Error('Fallback to local repository');
    } catch (err) {
      const found = mockAlumni.find(a => a.id === id || a.userId === id);
      if (!found) {
        throw new Error('Alumni profile not found');
      }
      return found;
    }
  },

  // Update profile for current user
  async updateProfile(id, updateData) {
    try {
      const response = await api.patch(`/alumni/${id}`, updateData);
      return response.data;
    } catch (err) {
      // Local update simulation
      const index = mockAlumni.findIndex(a => a.id === id || a.userId === id);
      if (index !== -1) {
        mockAlumni[index] = { ...mockAlumni[index], ...updateData, updatedAt: new Date().toISOString() };
        return mockAlumni[index];
      }
      throw err;
    }
  },

  // Get available filter choices
  async getFilters() {
    return getFilterOptions();
  },

  // Get high-level directory statistics
  async getStats() {
    if (import.meta.env.MODE === 'test') {
      const batches = new Set(mockAlumni.map(a => a.graduationYear)).size;
      const industries = new Set(mockAlumni.map(a => a.industry)).size;
      const countries = new Set(mockAlumni.map(a => a.country)).size;
      return {
        totalAlumni: mockAlumni.length,
        graduatingBatches: batches,
        industriesRepresented: industries,
        countriesReached: countries,
        upcomingEvents: 6,
        activeMentors: mockAlumni.filter(a => a.mentorshipAvailable).length
      };
    }
    try {
      const response = await api.get('/admin/stats');
      if (response && response.success) {
        return response.data;
      }
      throw new Error('Fallback to local stats');
    } catch (err) {
      const batches = new Set(mockAlumni.map(a => a.graduationYear)).size;
      const industries = new Set(mockAlumni.map(a => a.industry)).size;
      const countries = new Set(mockAlumni.map(a => a.country)).size;
      return {
        totalAlumni: mockAlumni.length,
        graduatingBatches: batches,
        industriesRepresented: industries,
        countriesReached: countries,
        upcomingEvents: 6,
        activeMentors: mockAlumni.filter(a => a.mentorshipAvailable).length
      };
    }
  }
};

// Helper function for local filtering
function filterLocalAlumni(params = {}) {
  let list = [...mockAlumni];
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
    limit = 9
  } = params;

  // Search filter (name, headline, company, job title, skills, bio, location)
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter(a =>
      a.fullName.toLowerCase().includes(q) ||
      a.currentCompany.toLowerCase().includes(q) ||
      a.currentJobTitle.toLowerCase().includes(q) ||
      a.department.toLowerCase().includes(q) ||
      a.location.toLowerCase().includes(q) ||
      a.skills.some(s => s.toLowerCase().includes(q))
    );
  }

  // Exact / Multi-criteria filters
  if (department) {
    list = list.filter(a => a.department === department);
  }
  if (graduationYear) {
    list = list.filter(a => a.graduationYear === Number(graduationYear));
  }
  if (industry) {
    list = list.filter(a => a.industry === industry);
  }
  if (degree) {
    list = list.filter(a => a.degree === degree);
  }
  if (country) {
    list = list.filter(a => a.country === country);
  }
  if (skill) {
    list = list.filter(a => a.skills.includes(skill));
  }
  if (mentorship === 'true') {
    list = list.filter(a => a.mentorshipAvailable === true);
  }

  // Sorting
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
      hasPrev: pageNum > 1
    }
  };
}

export default alumniService;
