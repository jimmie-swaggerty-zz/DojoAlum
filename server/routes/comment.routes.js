const CommentController = require('../controllers/comment.controller');

const { authenticate } = require('../config/jwt.config');

module.exports = function(app) {
  app.get('/api/comments', authenticate, CommentController.getAll);
  app.post('/api/comments', authenticate, CommentController.create);
  app.get('/api/posts/:id', authenticate, CommentController.getOne);
  app.put('/api/posts/:id', authenticate, CommentController.update);
  app.delete('/api/posts/:id', authenticate, CommentController.delete);

}