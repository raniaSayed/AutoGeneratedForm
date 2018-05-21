initObj = {};

initObj.init = function (){
    var path = require('path');
    var fs = require("fs");

    //var bodyParser = require("body-parser");
    var data = fs.readFileSync("file.json");
    //console.log(JSON.parse(data));
    var fileds = "";
    var mongooseFields ="";
    var html="";
    var mongooseData ="";
    var mongoose = require("mongoose");
    //mongoose.connect("mongodb://localhost:27017/blog4");
    var userModel;
    var useObj={};


    //read data structure file

    JSON.parse(data).forEach(element => {
    
    fileds+="<input type='"+element.html.type+"' placeholder= '"+element.html.placeholder+"' class= '"+element.html.class+"' name='"+element.name+ "' /><br> \n";
    mongooseFields+=element.name+":{type:"+element.type+"},\n";
    });

    // console.log(mongooseFields);

    //write html
    html = `<html>\n<body>\n<form method='post'>\n`+fileds+`<input type="submit">\n</form>\n</body>\n </html>`;
    fs.writeFileSync("views/form.ejs",html);

    //write mongoose

    mongooseData  =`var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var users = new Schema({`+mongooseFields+`});

    //Model Register
    mongoose.model("users",users);
    `;

    fs.writeFileSync("./models/mongoose.js",mongooseData);
    //require all models
    fs.readdirSync("./models").forEach(filename => {
        require("./models/"+filename); 
        console.log(filename)
    });
    userModel = mongoose.model("users");

}

module.exports = initObj;