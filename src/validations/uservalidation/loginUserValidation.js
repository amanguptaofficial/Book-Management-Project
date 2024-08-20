const Joi = require("joi");
const Util = require("../../utils/Utils");
const responseCode = require("../../utils/response-code");
const responseMessage = require("../../utils/response-message");


const loginSchema = Joi.object().keys({
email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().trim().lowercase(),
password:Joi.string().min(8).max(15).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().trim(),
});


const loginValidateUser = async(req,res,next)=>{
 try {
   const result = loginSchema.validate(req.body);
   if(result.error){ res.send(Util.response({code:responseCode.BAD_REQUEST,msg:result.error.message,data:{}}))}
   else{
    req.body =result.value;
    next();
  }
} catch (error) {
  res.send(Util.response({code:responseCode.INTERNAL_SERVER_ERROR,msg:responseMessage[responseCode.INTERNAL_SERVER_ERROR],data:{}}));
 }
}

module.exports={loginValidateUser};