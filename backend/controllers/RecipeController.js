const Recipe = require("./../model/Recipe");
const mongoose = require("mongoose");

const RecipeController = {
    index: async (req, res) => {
        try {
            const recipes = await Recipe.find().sort({ createdAt: -1 })

            res.status(200).json(recipes);
        } catch (error) {
            return res.status(500).json({ msg: "Something went wrong!!" })
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
    show: async (req, res) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: "Not a valid id!!" })
            }
            const recipe = await Recipe.findById(id);

            if (!recipe) {
                return res.status(404).json({ msg: "There is no recipe with that id" })
            }

            res.status(200).json(recipe);
        } catch (error) {
            return res.status(500).json({ msg: "Internal Server Error" })
        }
    },
    destroy: async(req, res) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: "Not a valid id!!" })
            }
            const recipe = await Recipe.findByIdAndDelete(id);

            if (!recipe) {
                return res.status(404).json({ msg: "There is no recipe with that id" })
            }

            res.status(200).json(recipe);
        } catch (error) {
            return res.status(500).json({ msg: "Internal Server Error" })
        }
    },
    update:async (req, res) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: "Not a valid id!!" })
            }
            const recipe = await Recipe.findByIdAndUpdate(id,{
                ...req.body
            },{new:true});

            if (!recipe) {
                return res.status(404).json({ msg: "There is no recipe with that id" })
            }

            res.status(200).json(recipe);
        } catch (error) {
            return res.status(500).json({ msg: "Internal Server Error" })
        }
    }
}

module.exports = RecipeController;