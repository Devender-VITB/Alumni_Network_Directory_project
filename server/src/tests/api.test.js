import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('AlumniConnect Backend REST API Tests', () => {
  let authToken = null;
  let testUserEmail = `test.graduate.${Date.now()}@alumniconnect.edu`;

  it('GET /api/health should return system status UP', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('UP');
    expect(res.body.service).toBe('AlumniConnect API Server');
  });

  describe('Authentication Endpoints', () => {
    it('POST /api/auth/register creates a new user account with valid inputs', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          fullName: 'Test Graduate',
          email: testUserEmail,
          password: 'Password@123',
          graduationYear: 2024,
          department: 'Computer Science & Engineering',
          degree: 'B.Tech in CS',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.token).toBeDefined();
      expect(res.body.data.user.email).toBe(testUserEmail);
      expect(res.body.data.user.passwordHash).toBeUndefined(); // Verify password hash is never exposed

      authToken = res.body.data.token;
    });

    it('POST /api/auth/register rejects duplicate email address with 409 Conflict', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          fullName: 'Test Graduate Duplicate',
          email: testUserEmail,
          password: 'Password@123',
        });

      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
    });

    it('POST /api/auth/register rejects password shorter than 8 characters', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          fullName: 'Short Pass User',
          email: 'shortpass@alumniconnect.edu',
          password: '123',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('POST /api/auth/login succeeds with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUserEmail,
          password: 'Password@123',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.token).toBeDefined();
    });

    it('POST /api/auth/login rejects incorrect password with 401', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUserEmail,
          password: 'WrongPassword456',
        });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('GET /api/auth/me returns current user when authenticated with Bearer token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.email).toBe(testUserEmail);
    });

    it('GET /api/auth/me denies unauthenticated request with 401', async () => {
      const res = await request(app).get('/api/auth/me');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Alumni Directory Endpoints', () => {
    it('GET /api/alumni returns paginated alumni records', async () => {
      const res = await request(app).get('/api/alumni?page=1&limit=6');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.items)).toBe(true);
      expect(res.body.data.pagination).toBeDefined();
      expect(res.body.data.pagination.page).toBe(1);
    });

    it('GET /api/alumni?search=Sarah filters alumni records by query', async () => {
      const res = await request(app).get('/api/alumni?search=Sarah');
      expect(res.status).toBe(200);
      expect(res.body.data.items.length).toBeGreaterThan(0);
      expect(res.body.data.items[0].fullName).toContain('Sarah');
    });

    it('GET /api/alumni/:id retrieves single alumni profile', async () => {
      const res = await request(app).get('/api/alumni/alm-101');
      expect(res.status).toBe(200);
      expect(res.body.data.fullName).toBe('Dr. Sarah Chen');
    });

    it('GET /api/alumni/:id returns 404 for non-existent record', async () => {
      const res = await request(app).get('/api/alumni/non-existent-id-999');
      expect(res.status).toBe(404);
    });
  });

  describe('Events & Registration Endpoints', () => {
    it('GET /api/events returns event list', async () => {
      const res = await request(app).get('/api/events');
      expect(res.status).toBe(200);
      expect(res.body.data.items.length).toBeGreaterThan(0);
    });

    it('POST /api/events/:id/register requires authentication', async () => {
      const res = await request(app).post('/api/events/evt-202/register');
      expect(res.status).toBe(401);
    });

    it('POST /api/events/:id/register confirms RSVP for authenticated user', async () => {
      const res = await request(app)
        .post('/api/events/evt-202/register')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('POST /api/events/:id/register rejects duplicate registration with 409', async () => {
      const res = await request(app)
        .post('/api/events/evt-202/register')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(409);
    });
  });

  describe('Administrative Stats Endpoint', () => {
    it('GET /api/admin/stats returns aggregate directory statistics', async () => {
      const res = await request(app).get('/api/admin/stats');
      expect(res.status).toBe(200);
      expect(res.body.data.totalAlumni).toBeGreaterThan(0);
    });
  });
});
