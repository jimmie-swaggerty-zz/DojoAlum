const Post = require('../models/Post.models');

module.exports = {
  getAll: (req, res) => {
    Post.find()
      .sort({ last_name: "ascending" })
      .then((allPost) => {
        console.log(allPost);
        res.json(allPost);
      })
      .catch((err) => {
        console.log("error in getAll: " + err);
        res.json(err);
      })
  },

  create: (req, res) => {
    Post.create(req.body)
      .then((newPost) => {
        console.log(newPost);
        res.json(newPost);
      })
      .catch((err) => {
        console.log("error in getAll: " + err);
        res.json(err);
      })
  },
  
  getOne: (req, res) => {
    Post.findById(req.params.id)
    .then((onePost) => { 
      console.log(onePost);
      res.json(onePost);
    })
    .catch((err) => {
      console.log("error in getOne: " + err);
      res.json(err);
    })
},
  
  update: (req, res) => {
    console.log("update");
    Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    .then((updatePost) => {
      console.log(updatePost);
      res.json(updatePost);
    })
    .catch((err) => {
      console.log("error in update: " + err);
      res.json(err);
    })
},

  delete: (req, res) => {
    Post.findByIdAndDelete(req.params.id)
    .then((deletePost) => {
      console.log(deltePost);
      res.json(deletePost);
    })
    .catch((err) => {
      console.log("error in delete: " + err);
      res.json(err);
    })
},
}