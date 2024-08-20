const responseCode = require("../utils/response-code")
const responseMessage = require("../utils/response-message")
const Util = require("../utils/Utils");
const userService = require("../services/userService");
const user = require("../models/userModel");

const registerUser = async function(req, res){
   try {
    const registerdUser = await userService.registerUserService(req.body);
    res.send(registerdUser);
   } catch (error) {
    console.log("controller",error.message);
    res.send(Util.response({code:responseCode.INTERNAL_SERVER_ERROR,msg:responseMessage[responseCode.INTERNAL_SERVER_ERROR],data:{}}));
   }
}

const loginUser = async function(req,res){
  try {
  const loggedInUser = await userService.loginUserService(req.body);
   res.send(loggedInUser)
  } catch (error) {
    res.send(Util.response({code:responseCode.INTERNAL_SERVER_ERROR,msg:responseMessage[responseCode.INTERNAL_SERVER_ERROR],data:{}}));
  }
}


module.exports={
  registerUser,
  loginUser
}