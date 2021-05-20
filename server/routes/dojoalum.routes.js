const PostController = require('../controller/post.controller');
const UserController = require('../controller/user.contrller');

module.exports = (app) => {
  app.get('/api/dojoalum/traning', PostController.getAll);
  app.post('/api/dojoalum/traning', PostController.create);
  app.get('/api/dojoalum/traning/:id', PostController.getOne);
  app.put('/api/dojoalum/traning/:id', TrainingController.update);
  app.delete('/api/dojoalum/traning/:id', PostController.delete);

  app.get('/api/dojoalum/user', UserController.getAll);
  app.post('/api/dojoalum/user', UserController.create);
  app.get('/api/dojoalum/user/:id', UserController.getOne);
  app.put('/api/dojoalum/user/:id', UserController.update);
  app.delete('/api/dojoalum/user/:id', UserController.delete);
  
}