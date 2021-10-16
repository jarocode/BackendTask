const jwt = require("jsonwebtoken");
const db = require("../models");

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
    if (!token) {
    return res.status(403).send({ message: "No token provided!"});
  }

  jwt.verify(token, process.env.SECRET_KEY , (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.user = decoded;
    next();
  });
};

const authJwt = {
    verifyToken
 };
  
  module.exports = authJwt;