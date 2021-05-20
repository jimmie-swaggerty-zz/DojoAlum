const PostController = require('../controllers/post.controller');

module.exports = (app) => {
  app.get('/api/dojoalum/post', PostController.getAll);
  app.post('/api/dojoalum/post', PostController.create);
  app.get('/api/dojoalum/post/:id', PostController.getOne);
  app.put('/api/dojoalum/post/:id', PostController.update);
  app.delete('/api/dojoalum/post/:id', PostController.delete);  
}