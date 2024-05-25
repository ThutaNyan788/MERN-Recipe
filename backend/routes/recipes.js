const express = require("express");
const router = express.Router();
const RecipeController = require("../controllers/RecipeController")

// get- all recipes
router.get("/",RecipeController.index);
// post- store recipes
router.post("/",RecipeController.store);
// get- single recipe
router.get("/:id",RecipeController.show);
// delete- single recipe
router.delete("/:id",RecipeController.destroy);
// patch- single  recipe
router.patch("/:id",RecipeController.update);



module.exports = router;