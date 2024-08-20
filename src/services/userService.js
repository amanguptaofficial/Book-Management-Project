const responseCode = require("../utils/response-code")
const responseMessage = require("../utils/response-message")
const Util = require("../utils/Utils")
const user = require("../models/userModel");
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUserService  = async function(requestData){
   try {
  const {name,email,password,phone} = requestData;
  const isEmailPresent = await user.findOne({email});
  if(isEmailPresent) return Util.responseFormat({code:responseCode.EMAIL_IS_ALREADY_EXITS,msg:responseMessage[responseCode.EMAIL_IS_ALREADY_EXITS],data:{}});
  const  isPhonePresent = await user.findOne({phone});
  if(isPhonePresent) return Util.responseFormat({code:responseCode.PHONE_NUMBER_IS_ALREADY_PRESENT,msg:responseMessage[responseCode.PHONE_NUMBER_IS_ALREADY_PRESENT],data:{}}); 
  requestData.name = name.split(' ').filter((word)=>word).join(' ');
  requestData.password = Bcrypt.hashSync(password,5);
  const userRegistered = await user.create(requestData);     
  return Util.responseFormat({code:responseCode.SUCCESS,msg:responseMessage[responseCode.SUCCESS],data:userRegistered}); 
  } catch (error) {
  console.log("service",error.message);
  return Util.responseFormat({code:responseCode.INTERNAL_SERVER_ERROR,msg:responseMessage[responseCode.INTERNAL_SERVER_ERROR],data:{}});
   }
}

const loginUserService = async function(requestData){
   try {
    const {email,password}= requestData
    const isUserPresent = await user.findOne({email});
    if(!isUserPresent) return Util.responseFormat({code:responseCode.EMAIL_ID_DOES_NOT_EXITS, msg:responseMessage[responseCode.EMAIL_ID_DOES_NOT_EXITS],data:{}});
   const isCorrectPassword = Bcrypt.compareSync(password, isUserPresent.password); 
   
  if(isCorrectPassword){
  const expiretoken = Math.floor(Date.now()/1000)+(2*60);
  const payload={
    userId:isUserPresent._id.toString(),
    exp:expiretoken
    }
  const token = jwt.sign(payload, "books")
   return Util.responseFormat({code:responseCode.SUCCESS,msg:responseMessage[responseCode.SUCCESS],data:token});
   }
   
   else{
    return Util.responseFormat({code:responseCode.INCORRECTED_PASSWORD,msg:responseMessage[responseCode.INCORRECTED_PASSWORD],data:{}});
   }
  } catch (error) {
  return Util.responseFormat({code:responseCode.INTERNAL_SERVER_ERROR,msg:responseMessage[responseCode.INTERNAL_SERVER_ERROR],data:{}});
   }
}

module.exports={
  registerUserService,
  loginUserService
};