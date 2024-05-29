const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const UserController = require("./../controllers/UserController");
const handleErrorMessage = require("./../middlewares/handleErrorMessage")
const User = require("./../model/User");
const AuthMiddleware = require("../middlewares/AuthMiddleware");


router.get("/me",AuthMiddleware,UserController.me);
router.post("/login",[
    body("email").notEmpty().isEmail(),
    body("password").notEmpty(),
],UserController.login);

router.post("/register", [
    body("name").notEmpty(),
    body("email").notEmpty().isEmail(),
    body('email').custom(async value => {
        const user = await User.findOne({email:value});
        if (user) {
            throw new Error('E-mail already in use');
        }
    }),
    body("password").notEmpty()
], handleErrorMessage, UserController.register);

router.post("/logout",UserController.logout);


module.exports = router;

