const Post = require("../models/post.models");
const jwt = require("jsonwebtoken");

module.exports = {
    getAll: (req, res) => {
        Post.find()
            .populate("user_id", "username")
            .populate("comments", "comment username")
            .sort({ createdAt: "descending" })
            .then((allPost) => {
                res.json(allPost);
                // console.log(allPost)
            })
            .catch((err) => {
                console.log("error in getAll: " + err);
                res.json(err);
            });
    },

    create: (req, res) => {
        console.log(req.body);
        const post = new Post(req.body);
        const decodedJwt = jwt.decode(req.cookies.usertoken, {
            complete: true,
        });

        post.user_id = decodedJwt.payload._id;

        Post.create(post)
            .then((newPost) => {
                res.json(newPost);
            })
            .catch((err) => {
                console.log("error in getAll: " + err);
                res.json(err);
                res.status(400).json(err);
            });
    },

    getOne: (req, res) => {
        Post.findById(req.params.id)
            .populate("user_id", "username")
            .populate("comments", "comment user_id");
        if (id !== req.body.user_id) {
            res.status(403).json({
                message: "You are not authorized to edit this post",
            });
        } else {
            Post.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            })
                .then((onePost) => {
                    res.json(onePost);
                })
                .catch((err) => {
                    console.log("error in getOne: " + err);
                    res.json(err);
                });
        }
    },

    update: (req, res) => {
        const decodedJwt = jwt.decode(req.cookies.usertoken, {
            complete: true,
        });
        console.log("decoded Jwt", decodedJwt);
        const id = decodedJwt.payload._id;
        console.log("update");
        if (id !== req.body.user_id) {
            res.status(403).json({
                message: "You are not authorized to edit this post",
            });
        } else {
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
                });
        }
    },

    delete: (req, res) => {
        Post.findByIdAndDelete(req.params.id)
            .then((deletePost) => {
                console.log(deletePost);
                res.json(deletePost);
            })
            .catch((err) => {
                console.log("error in delete: " + err);
                res.json(err);
            });
    },
    getUsers: (req, res) => {
        Post.find({ user_id: req.params.id })
            .then((allPost) => {
                res.json(allPost);
            })
            .catch((err) => {
                console.log("error in getAll: " + err);
                res.json(err);
            });
    },
};
