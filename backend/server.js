const express = require("express");
const morgan = require("morgan");
const app = express();
require("dotenv").config();


app.use(morgan("dev"));

app.get("/",(req,res)=>{
    return res.json({data:"hello"})
})


app.listen(process.env.PORT,()=>{
    console.log(`Server is running at port:${process.env.PORT}`);
})