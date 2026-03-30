import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /', () => {
    it('should return 200', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
    });

    it('should return Hello World! message', async () => {
      const response = await request(app.getHttpServer()).get('/');
      expect(response.text).toBe('Hello World!');
    });
  });

  describe('GET /users', () => {
    it('should return 200 and list of users', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200);
    });

    it('should return an array of users with correct structure', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach((user: any) => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('age');
      });
    });

    it('should return at least 4 initial users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(response.body.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('GET /users/:id', () => {
    it('should return 200 and a specific user', () => {
      return request(app.getHttpServer())
        .get('/users/uuid1')
        .expect(200);
    });

    it('should return the correct user when valid id is provided', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/uuid1')
        .expect(200);

      expect(response.body).toHaveProperty('id', 'uuid1');
      expect(response.body).toHaveProperty('name', 'John Doe');
      expect(response.body).toHaveProperty('age', 30);
    });

    it('should handle string ids correctly', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/uuid2')
        .expect(200);

      expect(response.body.id).toBe('uuid2');
    });
  });

  describe('POST /users', () => {
    it('should return 201 when creating a new user', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({ id: 'uuid999', name: 'Test User', age: 25 })
        .expect(201);
    });

    it('should return success message when user is created', async () => {
      const newUser = { id: 'uuid888', name: 'E2E Test User', age: 30 };
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(newUser)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'User created successfully');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toEqual(newUser);
    });
  });
});
