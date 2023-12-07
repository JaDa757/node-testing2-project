const express = require('express');
const Resource = require('./resources/resource-model.js'); 
const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'up' });
});


server.get('/resources', (req, res) => {
  Resource.getAll()
    .then(resources => {
      res.status(200).json(resources);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


server.get('/resources/:id', async (req, res) => {
  const resource = await Resource.getById(req.params.id);
  if (!resource) {
    res.status(404).end();
  } else {
    res.json(resource);
  }
});


server.post('/resources', async (req, res) => {
  const newResource = await Resource.insert(req.body);
  res.json(newResource);
});


server.delete('/resources/:id', async (req, res) => {
  const deletedResource = await Resource.remove(req.params.id);
  if (deletedResource) {
    res.json({ message: 'Resource deleted successfully' });
  } else {
    res.status(404).json({ message: 'Resource not found' });
  }
});


server.put('/resources/:id', async (req, res) => {
  const updatedResource = await Resource.update(req.params.id, req.body);
  if (updatedResource) {
    res.json(updatedResource);
  } else {
    res.status(404).json({ message: 'Resource not found' });
  }
});

module.exports = server;
