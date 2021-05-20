const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Your title must be at least 3 characters long"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      // give a list of all the valid values in this array
      // Adventure, Family, Fantasy, Romance,
      enum: ["Job Posting", "Code Help", "Share"],
    },
    //message for post
    content: {
      type: String,
      required: [true, "Please include a message in your post"],
    },
    url: {
        type: String,
        required: false
    },
    // add the user._id for the user that created this object
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      // each element in the array will refer to a comment model / object / document
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", PostSchema);
