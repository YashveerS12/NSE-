require("dotenv").config();
const express=require("express");
const router=express.Router();
const Company=require("../models/company.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

const companyController=require("../controllers/company.js");


//Index Route
router.get("/",companyController.index);

//New Route
router.get("/new",companyController.newCompany);

//Show Route
router.get("/:id",companyController.showCompanyDetails);

//Create Route
router.post("/", upload.single("company[areport]"), async(req,res)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    const newCompany=new Company(req.body.company);
    newCompany.areport={url,filename};
   await newCompany.save();
   console.log(newCompany)
   res.redirect("/listings");
});

//Edit Route
router.get("/:id/edit", companyController.editCompanyDetails);

//update Route
router.put("/:id",companyController.updateCompanyDetails);

//Delete Route
router.delete("/:id",companyController.deleteCompany);

module.exports=router;