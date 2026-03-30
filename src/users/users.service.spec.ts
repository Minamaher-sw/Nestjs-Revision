import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';


describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return an array of users', () => {
      const result = service.getUsers();
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return users with correct structure', () => {
      const result = service.getUsers();
      result.forEach((user) => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('age');
        expect(typeof user.id).toBe('string');
        expect(typeof user.name).toBe('string');
        expect(typeof user.age).toBe('number');
      });
    });

    it('should return 4 initial users', () => {
      const result = service.getUsers();
      expect(result.length).toBe(4);
    });
  });

  describe('getUserById', () => {
    it('should return a user when valid id is provided', () => {
      const result = service.getUserById('uuid1');
      expect(result).toBeDefined();
      expect(result?.id).toBe('uuid1');
      expect(result?.name).toBe('John Doe');
    });

    it('should return undefined when invalid id is provided', () => {
      const result = service.getUserById('invalid-id');
      expect(result).toBeUndefined();
    });

    it('should return correct user for different ids', () => {
      const user2 = service.getUserById('uuid2');
      expect(user2?.name).toBe('Jane Doe');

      const user3 = service.getUserById('uuid3');
      expect(user3?.name).toBe('Jim Doe');
    });
  });

  describe('createUser', () => {
    it('should create a new user', () => {
      const newUser = { id: 'uuid5', name: 'New User', age: 28 };
      const result = service.createUser(newUser);

      expect(result).toBeDefined();
      expect(result.id).toBe('uuid5');
      expect(result.name).toBe('New User');
      expect(result.age).toBe(28);
    });

    it('should add user to the users array', () => {
      const initialCount = service.getUsers().length;
      const newUser = { id: 'uuid6', name: 'Another User', age: 32 };

      service.createUser(newUser);
      const updatedUsers = service.getUsers();

      expect(updatedUsers.length).toBe(initialCount + 1);
      expect(updatedUsers).toContainEqual(newUser);
    });

    it('should return the created user object', () => {
      const newUser = { id: 'uuid7', name: 'Test User', age: 25 };
      const result = service.createUser(newUser);

      expect(result).toEqual(newUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by id', () => {
      const newUser = { id: 'uuid8', name: 'Delete User', age: 30 };
      service.createUser(newUser);
      const isDeleted = service.deleteUser('uuid8');

      expect(isDeleted).toBe(true);
      const deletedUser = service.getUserById('uuid8');
      expect(deletedUser).toBeUndefined();
    });

    it('should return false when trying to delete a non-existent user', () => {
      const isDeleted = service.deleteUser('non-existent-id');
      expect(isDeleted).toBe(false);
    });
  });
});
