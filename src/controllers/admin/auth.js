const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
const bcrypt = require('bcrypt');
const shortId = require('shortid');
env.config();

exports.signup = (req, res) => {
    User.findOne({email: req.body.email})
    .exec(async (error, user) => {
        if(user) return res.status(400).json({
           message: 'Admin already registered'
        });
        const {firstName,lastName,email,password} = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const _user = new User({firstName,lastName,username: shortId.generate(),email,hash_password, role: "admin"});
        _user.save((error, data) => {
            if(error){
                return res.status(400).json({
                    message: "something went wrong. Could not create user"
                })
            }
            if(data){
                return res.status(201).json({
                    message: "Admin created sucessfully",
                    user: data
                })
            }

        });
    })
}


exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
      if (error) return res.status(400).json({ error });
      if (user) {
          //promise is always true
          //Await only works if your function is asynchronous
          //You have to resolve the promise to get the value  (use await)  
        const isPassword = await user.authenticate(req.body.password);
        if (
          isPassword &&
          (user.role === "admin" || user.role === "super-admin")
        ) {
          const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );
          const { _id, firstName, lastName, email, role, fullName } = user;
          res.cookie("token", token, { expiresIn: "1d" });
          res.status(200).json({
            token,
            user: { _id, firstName, lastName, email, role, fullName },
          });
        } else {
          return res.status(400).json({
            message: "Invalid Username or Password",
          });
        }
      } else {
        return res.status(400).json({ message: "Something went wrong" });
      }
    });
  };

exports.signout = (req, res) => {
 res.clearCookie('token');
 res.status(200).json({
     message: "signout successfully"
 })  
}