const db = require('../../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
};

async function insert(resource) {
  const [id] = await db('resources').insert(resource);
  return db('resources').where({ id }).first();
}

async function update(id, changes) {
  await db('resources').where({ id }).update(changes);
  return db('resources').where({ id }).first();
}

function remove(id) {
  return db('resources').where({ id }).delete();
}

function getAll() {
  return db('resources');
}

function getById(id) {
  return db('resources').where({ id }).first();
}
