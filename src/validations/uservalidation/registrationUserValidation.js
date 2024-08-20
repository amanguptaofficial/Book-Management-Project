const Joi = require("joi");
const Util = require("../../utils/Utils");
const responseCode = require("../../utils/response-code");
const responseMessage = require("../../utils/response-message");

const registrationSchema = Joi.object().keys({
 title:Joi.string().valid("Mr","Mrs","Miss").required(),
 name:Joi.string().regex(/^[a-zA-Z\s]*$/).message("name contain only the characters").required().trim().lowercase(),
 phone:Joi.string().regex(/^\d+$/).message("phone can contain only the numbers").min(10).message("phone length must be 10 digit").max(10).message("phone number should be 10 digit").required().trim(),
 email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().trim().lowercase(),
 password:Joi.string().min(8).max(15).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().trim(),
 address:Joi.object({
  street:Joi.string().regex(/^[a-zA-Z0-9]*$/).message("street contain only the characters").required().trim(),
  city:Joi.string().regex(/^[A-Za-z]+$/).message("city contain only the characters").required().trim().lowercase(),
  pin:Joi.string().regex(/^\d+$/).message("pin can contain only numbers").min(6).message("pin must be contain 6 number").max(6).message("pin contains only 6 charaters").required().trim()
 }).optional()
})

const registervalidateUser = async (req,res,next)=>{
try {
   const result = registrationSchema.validate(req.body);
   //console.log(result);
   if(result.error){
     res.send(Util.response({code:responseCode.BAD_REQUEST,msg:result.error.message,data:{}}));
   }else{
    req.body = result.value;
    //console.log(req.body);
     next();
   }
} catch (error) {
 console.log(error.message);
 res.send(Util.responseFormat({code:responseCode.INTERNAL_SERVER_ERROR,msg:responseMessage[responseCode.INTERNAL_SERVER_ERROR],data:{}}))   
}
}

module.exports={registervalidateUser};