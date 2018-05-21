var express = require('express')
var path = require('path')
var fs = require('fs')
var app = express()
var bodyParser = require('body-parser')
var data = fs.readFileSync('file.json')
var mongooseFields = ''
var mongooseData = ''
var mongoose
var usersRouter

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded())



usersRouter = require('./controllers/users')
app.use('/', usersRouter)

mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/blog4')
// start listenning
app.listen(9090,() =>{console.log("Starting...")})
