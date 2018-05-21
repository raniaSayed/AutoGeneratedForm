var express = require('express');
var path = require('path');
var fs = require("fs");
var app = express();
var bodyParser = require('body-parser');

//var bodyParser = require("body-parser");
var data = fs.readFileSync("file.json");
//console.log(JSON.parse(data));
var fileds = "";
var mongooseFields ="";
var html="";
var mongooseData ="";
var userModel;
var useObj={};


app.set("view engine","ejs");
app.set("views","./views");

app.use(bodyParser.urlencoded());


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

fs.writeFileSync("./models/users.js",mongooseData);
  //require all models
fs.readdirSync("./models").forEach(filename => {
    require("./models/"+filename); 
    console.log(filename)
});
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog4");
// userModel = mongoose.model("users");

var usersRouter = require("./controllers/users");
app.use("/",usersRouter);

//start listenning
app.listen(9090);
