const PostController = require('../controllers/post.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
  app.get('/api/post', PostController.getAll);
  app.post('/api/post', authenticate,  PostController.create);
  app.get('/api/post/:id', PostController.getOne);
  app.put('/api/post/:id', authenticate, PostController.update);
  app.delete('/api/post/:id', authenticate, PostController.delete);  
}