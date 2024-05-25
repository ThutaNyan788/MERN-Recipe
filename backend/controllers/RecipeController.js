const Recipe = require("./../model/Recipe");

const RecipeController = {
    index: (req, res) => {
        res.send("All Recipes")
    },
    store: async (req, res) => {
        try {
            const { title, description, ingredients } = req.body;

            const recipe = await Recipe.create({
                title,
                description,
                ingredients
            })
            res.status(201).json(recipe);
        } catch (error) {
            return res.status(400).json({msg:"Invalid field"})
        }
    },
    show: (req, res) => {
        res.send("Show Single recipe")
    },
    destroy: (req, res) => {
        res.send("Delete recipe")
    },
    update: (req, res) => {
        res.send("Update recipe")
    }
}

module.exports = RecipeController;