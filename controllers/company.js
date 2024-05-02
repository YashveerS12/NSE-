require("dotenv").config();
const Company=require("../models/company.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

module.exports.index=async (req,res)=>{
    var search= "";
    if(req.query.search)
    {
        search=req.query.search;
    }
    const allCompany=await Company.find({
        $or:[
            {name:{$regex:'.*'+search+'.*',$options:'i'}},
        ]
    });
    res.render("company/index.ejs",{allCompany});
};

module.exports.newCompany=(req,res)=>{
    res.render("company/new.ejs")
};

module.exports.showCompanyDetails=async(req,res)=>{
    let {id}=req.params;
    const company=await Company.findById(id);
    res.render("company/show.ejs",{company});

};

// module.exports.createNewCompany=


module.exports.editCompanyDetails=async(req,res)=>{
    let {id}=req.params;
    const company=await Company.findById(id);
    res.render("company/edit.ejs",{company});
};

module.exports.updateCompanyDetails=async(req,res)=>{
    let {id}=req.params;
    await Company.findByIdAndUpdate(id,{...req.body.company});
    res.redirect("/listings");
};

module.exports.deleteCompany=async(req,res)=>{
    let {id}=req.params;
    let deletedCompany=await Company.findByIdAndDelete(id);
    console.log(deletedCompany);
    res.redirect("/listings");
};