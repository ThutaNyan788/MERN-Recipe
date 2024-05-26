// Require Module
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
// ENV File Access
require("dotenv").config();

// Router 
const recipesRoutes = require("./routes/recipes");
const usersRoutes = require("./routes/users");


app.use(cors());// For local development --Warning
app.use(express.json());
app.use(morgan("dev"));



// Recipes 
app.use("/api/recipes", recipesRoutes);
app.use("/api/users", usersRoutes);



// Database connecting
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Mongo database is connected");
        // Server Running
        app.listen(process.env.PORT, () => {
            console.log(`Server is running at port:${process.env.PORT}`);
        })
    })
    .catch((e) => {
        console.log(`Mongo Connect-Part:${e.message}`);
    })

