var mongoose = require('mongoose')
  var Schema = mongoose.Schema
  var users = new Schema({username:{type:String},
password:{type:String},
email:{type:String},
age:{type:Number},
kar:{type:Number},
})

  //Model Register
  mongoose.model("users",users)
  