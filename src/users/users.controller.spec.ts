jest.mock('src/pipe/convert-int/convert-int.pipe', () => ({
  ConvertIntPipe: jest.fn(),
}), { virtual: true });

import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    getUsers: jest.fn(),
    getUserById: jest.fn(),
    createUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have UsersService injected', () => {
    expect(service).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return an array of users', () => {
      const mockUsers = [
        { id: 'uuid1', name: 'John Doe', age: 30 },
        { id: 'uuid2', name: 'Jane Doe', age: 25 },
      ];

      mockUsersService.getUsers.mockReturnValue(mockUsers);

      const result = controller.getUsers();

      expect(result).toBeDefined();
      expect(result.length).toBe(2);
      expect(result).toEqual(mockUsers);
      expect(mockUsersService.getUsers).toHaveBeenCalledTimes(1);
    });

    it('should call UsersService.getUsers', () => {
      mockUsersService.getUsers.mockReturnValue([]);

      controller.getUsers();

      expect(mockUsersService.getUsers).toHaveBeenCalledTimes(1);
    });

    it('should handle empty users list', () => {
      mockUsersService.getUsers.mockReturnValue([]);

      const result = controller.getUsers();

      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', () => {
      const mockUser = { id: 'uuid1', name: 'John Doe', age: 30 };

      mockUsersService.getUserById.mockReturnValue(mockUser);

      const result = controller.getUserById('uuid1');

      expect(result).toBeDefined();
      expect(result).toEqual(mockUser);
      expect(mockUsersService.getUserById).toHaveBeenCalledWith('uuid1');
    });

    it('should return undefined when user is not found', () => {
      mockUsersService.getUserById.mockReturnValue(undefined);

      const result = controller.getUserById('invalid-id');

      expect(result).toBeUndefined();
      expect(mockUsersService.getUserById).toHaveBeenCalledWith('invalid-id');
    });

    it('should call UsersService.getUserById with correct id parameter', () => {
      mockUsersService.getUserById.mockReturnValue(null);

      controller.getUserById('uuid2');

      expect(mockUsersService.getUserById).toHaveBeenCalledWith('uuid2');
      expect(mockUsersService.getUserById).toHaveBeenCalledTimes(1);
    });

    it('should handle different user ids', () => {
      const mockUser = { id: 'uuid5', name: 'Test User', age: 28 };
      mockUsersService.getUserById.mockReturnValue(mockUser);

      const result = controller.getUserById('uuid5');

      expect(result).toEqual(mockUser);
      expect(mockUsersService.getUserById).toHaveBeenCalledWith('uuid5');
    });
  });

  describe('createUser', () => {
    it('should create a new user', () => {
      const newUserDto = { id: 'uuid5', name: 'New User', age: 28 };
      const mockResponse = {
        json: jest.fn(),
      } as any;

      mockUsersService.createUser.mockReturnValue(newUserDto);

      controller.createUser(newUserDto, mockResponse);

      expect(mockUsersService.createUser).toHaveBeenCalledWith(newUserDto);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'User created successfully',
        user: newUserDto,
      });
    });

    it('should send correct response structure after creating user', () => {
      const newUserDto = { id: 'uuid6', name: 'Another User', age: 32 };
      const mockResponse = {
        json: jest.fn(),
      } as any;

      mockUsersService.createUser.mockReturnValue(newUserDto);

      controller.createUser(newUserDto, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledTimes(1);
      const callArgs = mockResponse.json.mock.calls[0][0];
      expect(callArgs).toHaveProperty('message');
      expect(callArgs).toHaveProperty('user');
      expect(callArgs.message).toBe('User created successfully');
      expect(callArgs.user).toEqual(newUserDto);
    });

    it('should call service.createUser only once', () => {
      const newUserDto = { id: 'uuid7', name: 'Test User', age: 25 };
      const mockResponse = {
        json: jest.fn(),
      } as any;

      mockUsersService.createUser.mockReturnValue(newUserDto);

      controller.createUser(newUserDto, mockResponse);

      expect(mockUsersService.createUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', () => {
      const mockUser = { id: 'uuid1', name: 'John Doe', age: 30 };

      mockUsersService.getUserById.mockReturnValue(mockUser);

      const result = controller.getUserById('uuid1');

      expect(result).toBeDefined();
      expect(result).toEqual(mockUser);
      expect(mockUsersService.getUserById).toHaveBeenCalledWith('uuid1');
    });

    it('should return undefined when user is not found', () => {
      mockUsersService.getUserById.mockReturnValue(undefined);

      const result = controller.getUserById('invalid-id');

      expect(result).toBeUndefined();
      expect(mockUsersService.getUserById).toHaveBeenCalledWith('invalid-id');
    });

    it('should call UsersService.getUserById with correct id', () => {
      mockUsersService.getUserById.mockReturnValue(null);

      controller.getUserById('uuid2');

      expect(mockUsersService.getUserById).toHaveBeenCalledWith('uuid2');
    });
  });

  describe('createUser', () => {
    it('should create a new user', () => {
      const newUserDto = { id: 'uuid5', name: 'New User', age: 28 };
      const mockResponse = {
        json: jest.fn(),
      } as any;

      mockUsersService.createUser.mockReturnValue(newUserDto);

      controller.createUser(newUserDto, mockResponse);

      expect(mockUsersService.createUser).toHaveBeenCalledWith(newUserDto);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'User created successfully',
        user: newUserDto,
      });
    });

    it('should send correct response after creating user', () => {
      const newUserDto = { id: 'uuid6', name: 'Another User', age: 32 };
      const mockResponse = {
        json: jest.fn(),
      } as any;

      mockUsersService.createUser.mockReturnValue(newUserDto);

      controller.createUser(newUserDto, mockResponse);

      expect(mockResponse.json).toHaveBeenCalled();
      const callArgs = mockResponse.json.mock.calls[0][0];
      expect(callArgs).toHaveProperty('message');
      expect(callArgs).toHaveProperty('user');
      expect(callArgs.user).toEqual(newUserDto);
    });
  });
});
