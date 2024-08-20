const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {registervalidateUser}= require("../validations/uservalidation/registrationUserValidation");
const {loginValidateUser} = require("../validations/uservalidation/loginUserValidation");
const {createBookValidation}= require("../validations/bookValidation/createBookValidation");

//user routes.....
router.post("/register",registervalidateUser, userController.registerUser);
router.post("/login",loginValidateUser, userController.loginUser);

//Books API
router.post("/books",createBookValidation)






module.exports = router;
