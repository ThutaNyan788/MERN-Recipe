const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const RecipeController = require("../controllers/RecipeController");
const handleErrorMessage = require("../middlewares/handleErrorMessage");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const upload = require("./../helpers/upload");


// get- all recipes
router.get("/", RecipeController.index);


// post- store recipes
router.post("/", [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("ingredients").notEmpty().isArray({ min: 2 }).withMessage('At least 2 Ingredients')
], handleErrorMessage, RecipeController.store);


// get- single recipe
router.get("/:id", RecipeController.show);
// delete- single recipe
router.delete("/:id", RecipeController.destroy);
// store photo 
router.post("/:id/upload", upload.single("photo"),
    body("photo").custom((value, { req }) => {
        if (!req.file) {
            throw new Error("photo is require")
        }

        if (!req.file.mimetype.startsWith("image")) {
            throw new Error("photo must be image");
        }

        return true;
    })
    , handleErrorMessage, RecipeController.upload);
// patch- single  recipe
router.patch("/:id", RecipeController.update);



module.exports = router;