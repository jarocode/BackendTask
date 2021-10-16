const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    surname: req.body.surname,
    firstname: req.body.firstname,
    phone: req.body.phone,
    address: req.body.address
  });

  await user.save(async (err, user) => {
    if (err) {
      res.status(500).send({ message: {err} });
      return;
    }
    return res.status(200).send({ message: {errorStatus: 1, info:"registration successful!" }});
});
};

exports.signin = async (req, res) => {
  await User.findOne({
    username: req.body.username
  }).exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: {err }});
        return;
      }

      if (!user) {
        return res.status(404).send({ message: {errorStatus: 1, info: "User Not found." }});
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: {errorStatus:1, info:"Invalid Password!"}
        });
      }

      const token = jwt.sign(
        { 
          id: user.id, 
          firstname: user.firstname, 
          surname: user.surname, 
          email: user.email, 
          phonenumber: user.phone
        }, 
        process.env.SECRET_KEY, {
        expiresIn: 10800, // 3 hours
      });

      
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token
      });
    });
};