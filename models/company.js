const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const companySchema=new Schema({
    name:
    {
        type:String,
        required:true,
    },
    from:
    {
        type:Number,
        required:true,
    },
    to: {
        type:Number,
        required:true,
    },
    areport: {
        url:String,
       filename:String,
    },
})

const Company=mongoose.model("Company",companySchema);
module.exports=Company;