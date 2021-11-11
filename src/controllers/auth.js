const User = require("../models/user");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");
const shortId = require("shortid");
env.config();

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered",
      });
    const { firstName, lastName, username, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      username: shortId.generate(),
      email,
      hash_password,
    });
    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "something went wrong. Could not create user",
        });
      }
      if (data) {
        return res.status(201).json({
          message: "User created sucessfully",
          user: data,
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const isPassword =await user.authenticate(req.body.password);
      if (isPassword && user.role === "user") {
        //Generate token
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "2d" }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Something went wrong, please try again" });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "signout successfully",
  });
};
