const db = require("../models");
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Username
  await User.findOne({
    username: req.body.username
  }).exec(async (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: {errorStatus: 1, info:"Failed! Username is already in use!" }});
      return;
    }

    // Email
    await User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: {errorStatus: 1, info:"Failed! Email is already in use!" }});
        return;
      }

      next();
    });
  });
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
};
  
  module.exports = verifySignUp;