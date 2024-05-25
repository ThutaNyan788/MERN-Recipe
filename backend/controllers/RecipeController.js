const RecipeController = {
    index:(req,res)=>{
        res.send("All Recipes")
    },
    store:(req,res)=>{
        res.send("Store recipe")
    },
    show:(req,res)=>{
        res.send("Show Single recipe")
    },
    destroy:(req,res)=>{
        res.send("Delete recipe")
    },
    update:(req,res)=>{
        res.send("Update recipe")
    }
}

module.exports = RecipeController;