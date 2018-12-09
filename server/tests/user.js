// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../server';

const request = supertest(app);
const db = mongoose.connection;

describe('User Authentication Test', () => {
  beforeAll(() => db.dropDatabase());

  it('should connect to server with ok status', async () => {
    const response = await request.get('/api');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.message).toEqual('Status connected ok');
  });

  describe('User Registration', () => {
    const userData = {
      username: 'billy',
      password: 'password',
      confirmPassword: 'password'
    };
    it('should successfully register a user when form is valid', async () => {
      const response = await request
        .post('/api/v1/register')
        .send(userData);
      expect(response.status).toEqual(201);
      expect(response.body.message).toBe('User registration successful');
      expect(response.body).toHaveProperty('token');
    });

    it('should return an error response when form is empty', async () => {
      const response = await request.post('/api/v1/register');
      expect(response.status).toEqual(422);
      expect(response.body.message.username).toEqual('Username is required');
      expect(response.body.message.password).toEqual('Password is required');
    });

    it('should return an error if username is not alphanumeric', async () => {
      const user = {
        ...userData,
        username: '1234567'
      };
      const response = await request
        .post('/api/v1/register')
        .send(user);
      expect(response.status).toEqual(422);
      expect(response.body.message.username)
        .toEqual('Username is invalid (e.g brooke007)');
    });

    it('should return an error if username length is less than 3', async () => {
      const user = {
        ...userData,
        username: 'ab'
      };
      const response = await request
        .post('/api/v1/register')
        .send(user);
      expect(response.status).toEqual(422);
      expect(response.body.message.username)
        .toEqual('Username length too short');
    });

    it('should return an error if username length is more than 30',
      async () => {
        const user = {
          ...userData,
          username: 'abragshshshshshbcvcbdbbcbcbcbcbcbcbcdhdhjhdjxnnx'
        };
        const response = await request
          .post('/api/v1/register')
          .send(user);
        expect(response.status).toEqual(422);
        expect(response.body.message.username)
          .toEqual('Username length too long');
      });

    it('should return an error if password length is less than 6', async () => {
      const user = {
        ...userData,
        password: 'pass'
      };
      const response = await request
        .post('/api/v1/register')
        .send(user);
      expect(response.status).toEqual(422);
      expect(response.body.message.password)
        .toEqual('Password not strong enough');
    });

    it('should return an error if password length is less than 6', async () => {
      const user = {
        ...userData,
        password: 'pass'
      };
      const response = await request
        .post('/api/v1/register')
        .send(user);
      expect(response.status).toEqual(422);
      expect(response.body.message.password)
        .toEqual('Password not strong enough');
    });

    it('should return an error if password confirmation does not match',
      async () => {
        const user = {
          username: 'robbstark',
          password: 'password'
        };
        const response = await request
          .post('/api/v1/register')
          .send(user);
        expect(response.status).toEqual(422);
        expect(response.body.message.confirmPassword)
          .toEqual('Passwords do not match');
      });

    it('should return an error if username already exists', async () => {
      const response = await request
        .post('/api/v1/register')
        .send(userData);
      expect(response.status).toEqual(409);
      expect(response.body.message)
        .toEqual(`${userData.username} already chosen`);
    });
  });

  describe('User Login', () => {
    it('should login the user if credentials are valid', async () => {
      const userCredentials = { username: 'billy', password: 'password' };
      const response = await request
        .post('/api/v1/login')
        .send(userCredentials);

      expect(response.status).toEqual(200);
      expect(response.body.message).toEqual('User authentication success');
    });

    it('should not login user if credentails are invalid', async () => {
      const response = await request
        .post('/api/v1/login')
        .send({});

      expect(response.status).toEqual(401);
      expect(response.body.message).toEqual('Invalid authentication details');
    });
  });
});
