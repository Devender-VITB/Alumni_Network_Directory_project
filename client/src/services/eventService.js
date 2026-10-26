import api from './api';
import { mockEvents } from '../data/mockEventsData';

let localUserRegistrations = ['evt-201']; // Default registered event for demonstration

export const eventService = {
  async getEvents(params = {}) {
    try {
      const response = await api.get('/events', { params });
      if (response && response.success) {
        return response.data;
      }
      throw new Error('Fallback to local repository');
    } catch (err) {
      let list = [...mockEvents];
      if (params.category && params.category !== 'all') {
        list = list.filter(e => e.category === params.category);
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        list = list.filter(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q));
      }
      return {
        items: list,
        userRegistrations: localUserRegistrations
      };
    }
  },

  async getEventById(id) {
    try {
      const response = await api.get(`/events/${id}`);
      if (response && response.success) {
        return response.data;
      }
      throw new Error('Fallback to local repository');
    } catch (err) {
      const event = mockEvents.find(e => e.id === id);
      if (!event) throw new Error('Event not found');
      return {
        ...event,
        isRegistered: localUserRegistrations.includes(id)
      };
    }
  },

  async registerForEvent(id) {
    try {
      const response = await api.post(`/events/${id}/register`);
      return response.data;
    } catch (err) {
      if (!localUserRegistrations.includes(id)) {
        localUserRegistrations.push(id);
        const ev = mockEvents.find(e => e.id === id);
        if (ev) ev.registeredCount += 1;
      }
      return { success: true, message: 'Successfully registered for event' };
    }
  },

  async cancelRegistration(id) {
    try {
      const response = await api.delete(`/events/${id}/register`);
      return response.data;
    } catch (err) {
      localUserRegistrations = localUserRegistrations.filter(evtId => evtId !== id);
      const ev = mockEvents.find(e => e.id === id);
      if (ev && ev.registeredCount > 0) ev.registeredCount -= 1;
      return { success: true, message: 'Registration cancelled' };
    }
  },

  async getUserRegistrations() {
    return localUserRegistrations;
  }
};

export default eventService;
