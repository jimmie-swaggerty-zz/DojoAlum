const Post = require('../models/Post.models');
const jwt = require('jsonwebtoken');

module.exports = {
  getAll: (req, res) => {
    Post.find()
      .sort({ last_name: "ascending" })
      .then((allPost) => {
        res.json(allPost);
      })
      .catch((err) => {
        console.log("error in getAll: " + err);
        res.json(err);
      })
  },

  create: (req, res) => {
    console.log(req.body);
    const post = new Post(req.body);
    const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });

    post.user_id = decodedJwt.payload._id;

    Post.create(post)
      .then((newPost) => {
        res.json(newPost);
      })
      .catch((err) => {
        console.log("error in getAll: " + err);
        res.json(err);
        res.status(400).json(err);
      })
  },
  
  getOne: (req, res) => {
    Post.findById(req.params.id)
    .then((onePost) => { 
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
      res.status(400).json(err);
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