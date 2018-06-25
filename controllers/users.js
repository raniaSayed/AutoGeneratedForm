var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require('path')
var mongoose = require('mongoose')
var mongooseFields = ''
var mongooseData = ''
var mongoose
var userModel 
var data


fs.watchFile('schema.json', () => {

  data = fs.readFileSync('schema.json')

  //mongoose file generation
  mongooseFields ="";
  JSON.parse(data).forEach(element => {
    mongooseFields += element.name + ':{type:' + element.type + '},\n'
  })

  // write mongoose
  mongooseData = `var mongoose = require('mongoose')
  var Schema = mongoose.Schema
  var users = new Schema({` + mongooseFields + `})

  //Model Register
  mongoose.model("users",users)
  `

  fs.writeFileSync(path.join(__dirname, '/../models/users.js'), mongooseData)
  // require all models
  fs.readdirSync(path.join(__dirname, '/../models/')).forEach(filename => {
  require(path.join(__dirname, '/../models/') + filename)
  })
});

router.get('/add', (req, res) => {
   
   //template generation
   var userData = []
   data = fs.readFileSync('schema.json')
   JSON.parse(data).forEach(element => {
 
     userData.push(element)
   })
   res.locals.userData = userData

   res.render('users')
})


router.post('/add', function (req, res) {
  // add user to mongoose
  userModel = mongoose.model('users')
  //loop and validate emails, numbers
  //console.log(req.body)

  var user = new userModel(req.body)
  user.save((error, data) => {
    if (!error)
      // redirect to form route
      res.redirect('/add')
    else
      // render error message
      res.send(error)
  })
})
module.exports = router
