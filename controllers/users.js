var express  = require("express");
var router = express.Router();
var fs = require("fs");
var path = require('path');
var mongoose = require("mongoose");

// var data = fs.readFileSync("file.json");
//console.log(JSON.parse(data));
// var fileds = "";
// var mongooseFields ="";
// var html="";
// var mongooseData ="";
var mongoose = require("mongoose");
var userModel = mongoose.model("users");

router.get("/add",(req,res)=>{

  res.render("form");

});

router.post("/add",function(req,res){
    //add user to mongoose
    var userBody = req.body;
    console.log(userBody);

     var user =new userModel(userBody);
    user.save((error,data)=>{
        if(!error)
            res.redirect("form");
        else
            res.json(error);
    });
    //redirect to form
});
module.exports = router;
