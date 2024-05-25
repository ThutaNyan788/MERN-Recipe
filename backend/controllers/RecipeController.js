const Recipe = require("./../model/Recipe");

const RecipeController = {
    index: async (req, res) => {
        try {
            const recipes = await Recipe.find().sort({ createdAt: -1 })

            res.status(200).json(recipes);
        } catch (error) {
            return res.status(500).json({msg:"Something went wrong!!"})
        }
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
            return res.status(400).json({ msg: "Invalid field" })
        }
    },
    show:async (req, res) => {
        try {
            const {id} = req.params;
            const recipe = await Recipe.findById(id);

            res.status(200).json(recipe);
        } catch (error) {
            return res.status(404).json({msg:"This Recipe Not Found!!"})
        }
    },
    destroy: (req, res) => {
        res.send("Delete recipe")
    },
    update: (req, res) => {
        res.send("Update recipe")
    }
}

module.exports = RecipeController;