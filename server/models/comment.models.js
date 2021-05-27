const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  // check to make sure it is not a duplicate
  comment: {
    type: String,
    required: [ true, "Comment is required" ],
    minlength: [ 3, "Your comment must be at least 3 characters long" ],
  },
  // no duplicates must not have the same title AND release date
  commentDate: {
    type: Date,
    required: [ true, "Comment Date is required" ],
    min: [ '2021-01-01', "Minimum date for a comment is 2021-01-01" ],
    max: [ new Date() , "You cannot enter a release date that happens in the future" ]
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: "A post id is required to create a comment",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true })

module.exports = mongoose.model("Comment", CommentSchema);