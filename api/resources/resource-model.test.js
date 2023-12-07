const request = require('supertest');
const db = require('../../data/dbConfig.js');
const Resource = require('./resource-model.js');

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

describe('resource model', () => {
  describe('insert()', () => {
    it('inserts provided resource into db', async () => {
      await Resource.insert({ name: 'food', quantity: 100 });
      let resources = await Resource.getAll();
      expect(resources).toHaveLength(1);

      await Resource.insert({ name: 'gold', quantity: 200 });
      resources = await Resource.getAll();
      expect(resources).toHaveLength(2);
    });

    it('gives back the inserted resource', async () => {
      let resource = await Resource.insert({ name: 'food', quantity: 100 });
      expect(resource).toMatchObject({ id: 1, name: 'food', quantity: 100 });
      resource = await Resource.insert({ name: 'gold', quantity: 200 });
      expect(resource).toMatchObject({ id: 2, name: 'gold', quantity: 200 });
    });
  });

  describe('update()', () => {
    it('updates the resource', async () => {
      await Resource.insert({ name: 'food', quantity: 100 });
      const updated = await Resource.update(1, { quantity: 150 });
      expect(updated).toMatchObject({ id: 1, name: 'food', quantity: 150 });
    });
  });

  describe('remove()', () => {
    it('deletes the resource', async () => {
      await Resource.insert({ name: 'food', quantity: 100 });
      await Resource.insert({ name: 'gold', quantity: 200 });
      await Resource.remove(1);
      const resources = await db('resources');
      expect(resources).toHaveLength(1);
    });
  });

  describe('getAll()', () => {
    it('gets empty list when no resources in db', async () => {
      const resources = await Resource.getAll();
      expect(resources).toHaveLength(0);
    });

    it('can get a list with all resources in db', async () => {
      await db('resources').insert({ name: 'food', quantity: 100 });
      let resources = await Resource.getAll();
      expect(resources).toHaveLength(1);
      await db('resources').insert({ name: 'gold', quantity: 200 });
      resources = await Resource.getAll();
      expect(resources).toHaveLength(2);
    });
  });

  describe('getById()', () => {
    it('can find a resource by id', async () => {
      await db('resources').insert({ name: 'food', quantity: 100 });
      await db('resources').insert({ name: 'gold', quantity: 200 });
      const food = await Resource.getById(1);
      const gold = await Resource.getById(2);
      expect(food).toMatchObject({ id: 1, name: 'food', quantity: 100 });
      expect(gold).toMatchObject({ id: 2, name: 'gold', quantity: 200 });
    });
  });
});
