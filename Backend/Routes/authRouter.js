const { response } = require("express");
const express = require("express");
const { UserModel } = require("../UserModel");

let NEWEMPID = 150; 

const authRouter = express.Router();

authRouter.route("/signup").post(userSign);
authRouter.route("/login").post(userLogin);

async function userSign(req, res) {
  console.log(req.body, "data recieved");
  let data = req.body;
  data.id = ++NEWEMPID;

  console.log("new User ---> " ,data);

  let newUser = await UserModel.create(data);
  console.log(newUser);
  // res.end("Data has came");
  res.json(newUser);
}

async function userLogin(req, res) {
  try {
    let data = req.body;
    let user = await UserModel.findOne({ email: data.email });
    if (user) {
      console.log(user);
      if (user.password == data.password) {
        return res.json(user);
      } else {
        return res.json({
          errorMessage: "Invaild User Credentials",
          userpass: user.password,
          datapass: data.password,
        });
      }
    } else {
      return res.json({
        errorMessage: "User not found",
      });
    }
  } catch (err) {
    return res.json({
      errorMessage: err,
    });
  }
}

module.exports = authRouter;
