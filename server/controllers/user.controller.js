const User = require('../models/User.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    // register new user accounts
    register: (req, res) => {
      const user = new User(req.body);
      console.log(user);
      user.save()
          .then((loggedUser) => {
              console.log("successfully registered");
              // res.json({ message: "Successfully registered!", user: user})
              res.cookie("usertoken", jwt.sign({
                  _id: loggedUser._id,
                  username: loggedUser.username,
                  email: loggedUser.email
              }, process.env.MY_SECRET), {
                  httpOnly: true,
                  expires: new Date(Date.now() + 900000000)
              }).json({
                  message: "Successfully Registered",
                  userLoggedIn: {
                      username: loggedUser.username
                  }
              })
          })
          .catch((err) => {
              console.log("register not successful!");
              res.status(400).json(err);
          });
  },
  // login
  login: (req, res) => {
      User.findOne({email: req.body.email})
          .then((userRecord) => {
              if(userRecord === null) {
                  res.status(400).json({ message: "Invalid login Attempt 1" })
              } else {
                  bcrypt.compare(req.body.password, userRecord.password)
                      .then((passwordValid) => {
                          if(passwordValid) {
                              console.log("Password is valid");
                              res.cookie("usertoken", jwt.sign({
                                  _id: userRecord._id,
                                  username: userRecord.username,
                                  email: userRecord.email
                              }, process.env.MY_SECRET), {
                                  httpOnly: true,
                                  expires: new Date(Date.now() + 900000000)
                              }).json({
                                  message: "Successfully Logged In",
                                  userLoggedIn: {
                                      username: userRecord.username,
                                      email: userRecord.email
                                  }
                              })
                          } else {
                              res.status(400).json({ message: "Invalid Login Attempt 2"})
                          }
                      })
                      .catch(err => {
                          res.status(400).json({ message: "Invalid Login Attempt 3"});
                      })
              }
          })
          .catch(err => {
              res.status(400).json({ message: "Invalid Login Attempt 4"})
          })
  },
  logout: (req, res) => {
      console.log("logged out!");
      res.clearCookie("usertoken");
      res.json({ message: "You have successfully logged out!"});
  },
  getAll:(req, res) => {
    User.find()
    .then((allUsers) => {
      console.log(allUsers);
      res.json(allUsers);
    })
  .catch((err) => {
    console.log("error in getAll: " + err);
    res.json(err);
  })
  },
  getCurrent: (req, res)=>{
    const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });
    console.log("decoded Jwt",decodedJwt)
    const id = decodedJwt.payload._id;
      User.find({_id: id})
      .then((user) => {
          res.json(user),
          console.log(user)}
    )
  },
  //get individual user
  getOne: (req, res)=>{
    User.findById(req.params.id)
      .then((user) => {
          res.json(user),
          console.log(user)}
    )
  }
}