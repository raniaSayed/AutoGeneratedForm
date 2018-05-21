var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require('path')
var mongoose = require('mongoose')
var userModel = mongoose.model('users')
var data = fs.readFileSync('file.json')

router.get('/add', (req, res) => {
  var userData = []
  JSON.parse(data).forEach(element => {

    userData.push(element)
  })
  res.locals.userData = userData

  res.render('users')
})

router.post('/add', function (req, res) {
  // add user to mongoose
  var user = new userModel(req.body)
  user.save((error, data) => {
    if (!error)
      // redirect to form route
      res.redirect('/add')
    else
      // render error view
      res.render('error')
  })
})
module.exports = router
