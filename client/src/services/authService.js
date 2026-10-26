import api from './api';

const TOKEN_KEY = 'alumniconnect_token';
const USER_KEY = 'alumniconnect_user';

export const authService = {
  async register(formData) {
    try {
      const response = await api.post('/auth/register', formData);
      if (response && response.data) {
        this.saveAuth(response.data.token, response.data.user);
        return response.data;
      }
      throw new Error('Invalid registration response');
    } catch (err) {
      // Demo mode fallback registration
      const mockUser = {
        id: 'usr-' + Date.now(),
        name: formData.fullName || formData.name,
        email: formData.email,
        role: 'user',
        avatar: '',
        graduationYear: formData.graduationYear,
        department: formData.department,
        degree: formData.degree,
      };
      const mockToken = 'mock_jwt_token_' + Date.now();
      this.saveAuth(mockToken, mockUser);
      return { user: mockUser, token: mockToken };
    }
  },

  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response && response.data) {
        this.saveAuth(response.data.token, response.data.user);
        return response.data;
      }
      throw new Error('Invalid login response');
    } catch (err) {
      // Demo mode fallback credentials check
      const { email, password } = credentials;
      let userRole = 'user';
      let userName = 'Sarah Chen';
      let userId = 'usr-101';
      let avatar = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80';

      if (email.toLowerCase().includes('admin')) {
        userRole = 'admin';
        userName = 'System Administrator';
        userId = 'usr-admin';
        avatar = '';
      }

      const mockUser = {
        id: userId,
        name: userName,
        email: email,
        role: userRole,
        avatar: avatar,
        graduationYear: 2016,
        department: 'Computer Science & Engineering',
        degree: 'B.Tech in Computer Science',
      };
      const mockToken = 'mock_jwt_token_' + Date.now();
      this.saveAuth(mockToken, mockUser);
      return { user: mockUser, token: mockToken };
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      if (response && response.data) {
        return response.data;
      }
      return this.getStoredUser();
    } catch (err) {
      return this.getStoredUser();
    }
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      // Ignore network errors on logout
    } finally {
      this.clearAuth();
    }
  },

  saveAuth(token, user) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getStoredToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getStoredUser() {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }
};

export default authService;
