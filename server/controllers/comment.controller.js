const Comment = require('../models/comment.models');
const Post = require('../models/post.models');
const jwt = require('jsonwebtoken');

module.exports = {
  getAll: (req, res) => {
    Comment.find({})
      .sort({ commentDate : "descending" })
      .populate("user_id", "username email -_id")
      .then((allComments) => {
        console.log("in all comments");
        // console.log(allComments);
        res.json(allComments);
      })
      .catch((err) => {
        console.log("error found in getAll");
        res.status(400).json(err);
      })
  },

  create: (req, res) => {
    console.log(req.body);
    const comment = new Comment(req.body);
    const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });

    comment.user_id = decodedJwt.payload._id;

    // craete a comment in the comments collection
    Comment.create(comment)
      .then((newComment) => {
        console.log("in create");
        console.log(newComment);

        // still need to update the Post document to include this new comment _id
        Post.findByIdAndUpdate(newComment.post, 
          // this is the data that we want to update
          {
            $push: { comments: newComment._id } 
          }, 
          {
            new: true,  // give me the new version...not the original
            useFindAndModify: false,  // by default mongoose will replace the entire object
          })
          .populate("comments", "-_id -__v -createdAt -updatedAt")
          .populate("user_id", "-_id")
          .then((updatedPost) => {
            console.log("in update post comments");
            // console.log(updatedPost);
            // res.json(newComment);
            res.json(updatedPost);
          })
          .catch((err) => {
            console.log("error found in add comment to post");
            console.log(err);
            res.status(400).json(err);
          })
      })
      .catch((err) => {
        console.log("error found in create comment");
        console.log(err);
        res.status(400).json(err);
      })
  },

  getOne: (req, res) => {
    console.log(req.params.id);

    Post.findById(req.params.id)
      .populate("user_id", "username email -_id")
      .then((onePost) => {
        console.log("in get one post");
        // console.log(onePost);
        res.json(onePost);
      })
      .catch((err) => {
        console.log("error found in getOne");
        res.status(400).json(err);
      })
  },

  update: (req, res) => {
    console.log(req.params.id);

    Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,  // give me the new version...not the original
      runValidators: true,  // by default mongoose will NOT validate on updates
    })
      .then((updatedPost) => {
        console.log("in update post");
        // console.log(updatedPost);
        res.json(updatedPost);
      })
      .catch((err) => {
        console.log("error found in update");
        res.status(400).json(err);
      })
  },

  delete: (req, res) => {
    console.log(req.params.id);

    Post.findByIdAndDelete(req.params.id)
      .then((deletedPost) => {
        console.log("in delete post");
        // console.log(deletedPost);
        res.json(deletedPost);
      })
      .catch((err) => {
        console.log("error found in delete");
        res.status(400).json(err);
      })
  },
}