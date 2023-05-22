import { testApp } from '../utils';
import { Request, Response } from 'express';

jest.mock('@controllers/user.controller', () => {
  const mockFunctions: Record<string, jest.Mock> = {};

  const mockModule = jest.requireActual('@controllers/user.controller');

  Object.keys(mockModule).forEach((key) => {
    mockFunctions[key as string] = jest.fn((_req: Request, res: Response) => {
      res.send('Mocked user controller');
    });
  });

  return {
    ...mockFunctions,
  };
});

describe('User Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Create User', () => {
    it('should return a success post message', async () => {
      const response = await testApp
        .post('/api/users')
        .send({
          name: 'test',
          email: '',
          password: '',
        })
        .expect(200);

      expect(response.text).toBe('Mocked user controller');
    });
  });

  describe('Get User', () => {
    it('should return a success get message', async () => {
      const response = await testApp.get('/api/users/253h').expect(200);

      expect(response.text).toBe('Mocked user controller');
    });
  });

  describe('Login User', () => {
    it('should return a success login message', async () => {
      const response = await testApp
        .post('/api/users/login')
        .send({
          email: '',
          password: '',
        })
        .expect(200);
    });
  });

  describe('Update User', () => {
    it('should return a success patch message', async () => {
      const response = await testApp
        .patch('/api/users/253h')
        .set('Authorization', `Bearer ${process.env.TEST_USER_TOKEN}`)
        .send({
          name: 'test',
          email: '',
        })
        .expect(200);

      expect(response.text).toBe('Mocked user controller');
    });

    it('should return a unauthorized patch message', async () => {
      const response = await testApp
        .patch('/api/users/26j')
        .send({
          name: 'test',
          email: '',
        })
        .expect(403);
    });
  });

  describe('Delete User', () => {
    it('should return a success delete message', async () => {
      const response = await testApp
        .delete('/api/users/253h')
        .set('Authorization', `Bearer ${process.env.TEST_USER_TOKEN}`)
        .expect(200);

      expect(response.text).toBe('Mocked user controller');
    });

    it('should return a unauthorized delete message', async () => {
      const response = await testApp.delete('/api/users/26j').expect(403);
    });
  });
});
