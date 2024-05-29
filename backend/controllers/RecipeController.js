const { fileURLToPath } = require("url");
const Recipe = require("./../model/Recipe");
const mongoose = require("mongoose");
const fs = require("fs").promises;
const removeFile = require("./../helpers/removeFile");
const emailQueue =  require("./../queues/emailQueue");
const User = require("../model/User");




const RecipeController = {
    index: async (req, res) => {
        try {
            let limit = 3;
            let page = req.query.page || 1;

            const recipes = await Recipe
                .find()
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ createdAt: -1 })


            let totalRecipeCount = await Recipe.countDocuments();
            let totalPagesCount = Math.ceil(totalRecipeCount / limit);



            let links = {
                nextPage: totalPagesCount == page ? false : true,
                previousPage: page == 1 ? false : true,
                currentPage: page,
                loopableLinks: []
            }

            for (let index = 0; index < totalPagesCount; index++) {
                let number = index + 1;

                links.loopableLinks.push({ number });

            }

            let response = {
                links,
                data: recipes
            };
            return res.status(200).json(response);
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
            });

            let users = await User.find(null, ["email"]);
            let emails = users.map((user) => user.email);
            emails = emails.filter(email => email !== req.user.email);
        
            // email queue
            emailQueue.add({
                viewFileName: "email.ejs",
                data: {
                    name: req.user.name,
                    recipe
                },
                from: req.user.email,
                to: emails,
                subject: "New Recipe is created by someone !!"
            })

            res.status(200).json(recipe);
        } catch (error) {
            return res.status(500).json({ msg: error.message })
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
    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: "Not a valid id!!" })
            }
            const recipe = await Recipe.findByIdAndDelete(id);

            let path = __dirname + "/../public" + recipe.photo;
            await removeFile(path);
            if (!recipe) {
                return res.status(404).json({ msg: "There is no recipe with that id" })
            }

            res.status(200).json(recipe);
        } catch (error) {
            return res.status(500).json({ msg: "Internal Server Error" })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: "Not a valid id!!" })
            }
            const recipe = await Recipe.findByIdAndUpdate(id, {
                ...req.body
            }, { new: true });

            //if recipe's photo ->delete
            let path = __dirname + "/../public" + recipe.photo;
            await removeFile(path);

            if (!recipe) {
                return res.status(404).json({ msg: "There is no recipe with that id" })
            }

            res.status(200).json(recipe);
        } catch (error) {
            return res.status(500).json({ msg: "Internal Server Error" })
        }
    },
    upload: async (req, res) => {
        try {
            // console.log(req.file);
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: "Not a valid id!!" })
            }
            const recipe = await Recipe.findByIdAndUpdate(id, {
                photo: "/" + req.file.filename
            }, { new: true });

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