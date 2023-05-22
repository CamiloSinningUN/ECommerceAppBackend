import { testUsers } from '../utils';
import { userController } from '@controllers';
import { User } from '@models';

const [newUser, ...prevUsers] = testUsers;
let insertedUsers: any[] = [];

describe('User controllers', () => {
  beforeEach(async () => {
    jest.clearAllMocks();

    for (const user of prevUsers) {
      const newUser = new User(user);
      await newUser.save();
      insertedUsers.push({
        ...newUser.toObject(),
        _id: newUser._id,
        password: user.password,
      });
    }
  });

  afterEach(async () => {
    await User.deleteMany({});
    insertedUsers = [];
  });

  describe('Create User', () => {
    it('should create a new user', async () => {
      const req = {
        body: newUser,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await userController.createUser(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should not create a new user with invalid data', async () => {
      const req = {
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await userController.createUser(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith();
    });
  });

  describe('Get User', () => {
    it('should get a user', async () => {
      const req = {
        params: {
          id: insertedUsers[0]._id,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await userController.getUser(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should not get a user with invalid id', async () => {
      const req = {
        params: {
          id: '123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await userController.getUser(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith();
    });
  });

  describe('Get User Token', () => {
    it('should get a user token', async () => {
      const req = {
        body: {
          email: insertedUsers[0].email,
          password: insertedUsers[0].password,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await userController.getUserToken(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should not get a user token with invalid data', async () => {
      const req = {
        body: {
          email: 'test',
          password: 'test',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await userController.getUserToken(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith();
    });
  });

  describe('Update User', () => {
    it('should update a user', async () => {
      const req = {
        params: {
          id: insertedUsers[0]._id,
        },
        userId: insertedUsers[0]._id,
        body: {
          name: 'test',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await userController.updateUser(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should not update a user with invalid id', async () => {
      const req = {
        params: {
          id: '123',
        },
        body: {
          name: 'test',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await userController.updateUser(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith();
    });
  });

  describe('Delete User', () => {
    it('should delete a user', async () => {
      const req = {
        params: {
          id: insertedUsers[0]._id,
        },
        userId: insertedUsers[0]._id,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await userController.deleteUser(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should not delete a user with invalid id', async () => {
      const req = {
        params: {
          id: '123',
        },
        userId: insertedUsers[0]._id,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await userController.deleteUser(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith();
    });
  });
});
