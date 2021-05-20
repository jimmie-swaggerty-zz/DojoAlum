const User = require('../models/User.models');

module.exports = {
  getAll: (req, res) => {
    User.find()
      .sort({ last_name: "ascending" })
      .then((allUser) => {
        console.log(allUser);
        res.json(allUser);
      })
      .catch((err) => {
        console.log("error in getAll: " + err);
        res.json(err);
      })
  },

  create: (req, res) => {
    User.create(req.body)
      .then((newUser) => {
        console.log(newUser);
        res.json(newUser);
      })
      .catch((err) => {
        console.log("error in getAll: " + err);
        res.json(err);
      })
  },
  
  getOne: (req, res) => {
    User.findById(req.params.id)
    .then((oneUser) => { 
      console.log(oneUser);
      res.json(oneUser);
    })
    .catch((err) => {
      console.log("error in getOne: " + err);
      res.json(err);
    })
},
  
  update: (req, res) => {
    console.log("update");
    User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    .then((updateUser) => {
      console.log(updateUser);
      res.json(updateUser);
    })
    .catch((err) => {
      console.log("error in update: " + err);
      res.json(err);
    })
},

  delete: (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then((deleteUser) => {
      console.log(delteUser);
      res.json(deleteUser);
    })
    .catch((err) => {
      console.log("error in delete: " + err);
      res.json(err);
    })
},
}