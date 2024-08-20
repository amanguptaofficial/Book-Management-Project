const Joi = require("joi");
const mongoose  = require("mongoose");
const Util = require("../../utils/Utils");
const responseCode = require("../../utils/response-code");

const bookSchema = Joi.object().keys({
   title:Joi.string().regex(/^[a-zA-Z\s]*$/).message("Title can contain only the character").required().trim().lowercase(),
   excerpt:Joi.string().regex(/^[a-zA-Z\s,0-9]*$/).message("excert can contain only the character").required().trim().lowercase(),
   userId:Joi.string().custom((value,helper)=>{
    if(!mongoose.Types.ObjectId.isValid(value)){
      return helper.message("Invalid User Id")
    }else{
      return value;
    }
   }),
   ISBN:Joi.string().regex(/^\d+$/).message("ISBN contain only number").required().trim(),
   category:Joi.string().regex(/^[a-zA-Z\s]*$/).message("category contain only the character").required().trim().lowercase(),
   subcategory:Joi.array().items(Joi.string().regex(/^[a-zA-Z\s]*$/).message("Subcategory contain only String iteam").required().trim().lowercase()),
});


const createBookValidation = async(req,res,next)=>{
  try {
     const result = bookSchema.validate(req.body);
     if(result.error){
    res.send(Util.response({code:responseCode.BAD_REQUEST,msg:result.error.message,data:{}}));
     }else{
     req.body = result.value;
     console.log(req.body);
     next();
     }
  } catch (error) {
    res.send(Util.response({code:responseCode.INTERNAL_SERVER_ERROR,msg:responseMessage[responseCode.INTERNAL_SERVER_ERROR],data:{}}))   
  }
}


module.exports={createBookValidation};