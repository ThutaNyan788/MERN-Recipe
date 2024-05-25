// Require Module
const express = require("express");
const morgan = require("morgan");
const app = express();
// ENV File Access
require("dotenv").config();


// Router 
const recipesRoutes = require("./routes/recipes");

app.use(morgan("dev"));



// Recipes 
app.use("/api/recipes",recipesRoutes);


// Server Running
app.listen(process.env.PORT,()=>{
    console.log(`Server is running at port:${process.env.PORT}`);
})