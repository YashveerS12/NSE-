 require("dotenv").config();
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");

const company=require("./routes/company.js");


// const MONGO_URL="mongodb://127.0.0.1:27017/nse";
const dbUrl=process.env.ATLASDB_URL;
main().then(()=>{
    console.log("Connected to db");
}).catch(err=>{
    console.log(err);
})
async function main(){
await mongoose.connect(dbUrl);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


app.get("/", (req,res)=>{
    res.redirect("/listings");
});

app.use("/listings",company);

app.listen(8080,()=>{
    console.log("Server is listening at port 8080");
});