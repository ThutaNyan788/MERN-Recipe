// Require Module
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cron = require('node-cron');
const sendEmail = require("./helpers/sendEmail")
const app = express();

app.use(express.static("public"));
// ENV File Access
require("dotenv").config();

// Router 
const recipesRoutes = require("./routes/recipes");
const usersRoutes = require("./routes/users");
const AuthMiddleware = require("./middlewares/AuthMiddleware");










app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));// For local development --Warning
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", "./views");



app.get("/", (req, res) => {
    res.status(200).json({ msg: "Hello World" })
})
// Recipes 
app.use("/api/recipes", AuthMiddleware, recipesRoutes);
app.use("/api/users", usersRoutes);




app.get("/set-cookie", (req, res) => {
    // res.setHeader("Set-Cookie","name=thutanyan");
    res.cookie("name", "aung aung");
    res.cookie("important-key", "valuesha1234", { httpOnly: true });
    res.send("Cookie already sent")
})

app.get("/get-cookie", (req, res) => {
    let cookies = req.cookies;

    return res.json(cookies);
})




app.get("/send-email", async  (req, res) => {

   try {
    await sendEmail({
        viewFileName:"test",
        data:{
            name:"Aung Aung"
        },
        from:"mgmg@gmail.com",
        to:"aungaung@gmail.com",
        subject:"Hello Aung Aung!!"
    });

    return res.send("email is sent")
   } catch (error) {
        return res.status(500).json({
            message:error.message,
            status:500
        })
   }
})




// Database connecting
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Mongo database is connected");
        // Server Running
        app.listen(process.env.PORT, () => {
            console.log(`Server is running at port:${process.env.PORT}`);

            // corn job
            // cron.schedule('*/4 * * * * *', () => {
            //     console.log('running a task every 4 secodns');
            // });

        })
    })
    .catch((e) => {
        console.log(`Mongo Connect-Part:${e.message}`);
    })

