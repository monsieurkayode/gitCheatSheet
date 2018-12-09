// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from 'supertest';
import mongoose from 'mongoose';
import app, { server } from '../server';

const request = supertest(app);

describe('Cheats Endpoints Test', () => {
  afterAll(() => {
    mongoose.disconnect();
    server.close();
  });

  describe('Fetch all cheats', () => {
    it('should fetch all cheat sheets commands', async () => {
      const response = await request.get('/api/v1/cheats');
      expect(response.status).toEqual(200);
      expect(response.body.cheatSheets).toBeInstanceOf(Array);
      expect(response.body.cheatSheets.length).toBeGreaterThan(0);
    });
  });

  describe('Fetch cheats by category', () => {
    it('should fetch all cheats belonging to a category', async () => {
      const response = await request.get('/api/v1/cheats/tagging');
      expect(response.status).toEqual(200);
      expect(response.body.cheatSheets.length).toBeGreaterThan(0);
    });
  });

  describe('Fetch all categories', () => {
    it('should fetch all catgeories', async () => {
      const response = await request.get('/api/v1/categories');
      expect(response.status).toEqual(200);
      expect(response.body.categories.length).toBeGreaterThan(0);
    });
  });
});
