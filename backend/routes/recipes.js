const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const RecipeController = require("../controllers/RecipeController");
const handleErrorMessage = require("../middlewares/handleErrorMessage");

// get- all recipes
router.get("/", RecipeController.index);


// post- store recipes
router.post("/", [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("ingredients").notEmpty().isArray({min:2}).withMessage('At least 2 Ingredients')
],handleErrorMessage, RecipeController.store);


// get- single recipe
router.get("/:id", RecipeController.show);
// delete- single recipe
router.delete("/:id", RecipeController.destroy);
// patch- single  recipe
router.patch("/:id", RecipeController.update);



module.exports = router;