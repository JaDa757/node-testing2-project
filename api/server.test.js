const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server.js');

const resource1 = { name: 'food', quantity: 100 };
const resource2 = { name: 'gold', quantity: 200 };

beforeAll(async () => {
  await db.migrate.rollback(); 
  await db.migrate.latest();
});

beforeEach(async () => {
  await db('resources').truncate();
});

afterAll(async () => {
  await db.destroy();
});

describe('server.js', () => {
  it('should set testing environment', () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });

  describe('[GET] /', () => {
    it('should return 200 OK', async () => {
      const res = await request(server).get('/');
      expect(res.status).toBe(200);
    });

    it('should return JSON', async () => {
      const res = await request(server).get('/');
      expect(res.type).toBe('application/json');
    });

    it('should return { api: "up" }', async () => {
      const res = await request(server).get('/');
      expect(res.body).toEqual({ api: 'up' });
    });
  });

  describe('[GET] /resources', () => {
    it('responds with 200 OK', async () => {
      const res = await request(server).get('/resources');
      expect(res.status).toBe(200);
    });

    it('responds with empty array if no resources', async () => {
      const res = await request(server).get('/resources');
      expect(res.body).toHaveLength(0);
    });

    it('responds with resources if resources exist', async () => {
      await db('resources').insert(resource1);
      let res = await request(server).get('/resources');
      expect(res.body).toHaveLength(1);
      await db('resources').insert(resource2);
      res = await request(server).get('/resources');
      expect(res.body).toHaveLength(2);
      expect(res.body[0]).toMatchObject(resource1);
      expect(res.body[1]).toMatchObject(resource2);
    });
  });

  describe('[GET] /resources/:id', () => {
    it('responds with the resource with the given id', async () => {
      await db('resources').insert(resource1);
      let res = await request(server).get('/resources/1');
      expect(res.body).toMatchObject(resource1);
    });

    it('responds with a 404 if id not in the database', async () => {
      const response = await request(server).get('/resources/1');
      expect(response.status).toBe(404);
    });
  });

  describe('[POST] /resources', () => {
    it('returns the newly created resource', async () => {
      const res = await request(server).post('/resources').send(resource1);
      expect(res.body.id).toBe(1);
      expect(res.body.name).toBe('food');
      expect(res.body.quantity).toBe(100);
    });
  });

  describe('[DELETE] /resources/:id', () => {
    it('deletes the resource with the given id', async () => {
      await db('resources').insert(resource1);
      const res = await request(server).delete('/resources/1');
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Resource deleted successfully');
      
      const resources = await db('resources');
      expect(resources).toHaveLength(0);
    });

    it('responds with a 404 if id not in the database', async () => {
      const response = await request(server).delete('/resources/1');
      expect(response.status).toBe(404);
    });
  });

  describe('[PUT] /resources/:id', () => {
    it('updates the resource with the given id', async () => {
      await db('resources').insert(resource1);
      const updatedResource = { name: 'updatedFood', quantity: 150 };
      const res = await request(server).put('/resources/1').send(updatedResource);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(updatedResource);
      
      const resources = await db('resources');
      expect(resources).toHaveLength(1);
      expect(resources[0]).toMatchObject(updatedResource);
    });

    it('responds with a 404 if id not in the database', async () => {
      const response = await request(server).put('/resources/1').send(resource1);
      expect(response.status).toBe(404);
    });
  });

  
});
