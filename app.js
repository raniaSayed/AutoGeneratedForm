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

// read data structure file

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

fs.writeFileSync('./models/users.js', mongooseData)
// require all models
fs.readdirSync('./models').forEach(filename => {
  require('./models/' + filename)
  console.log(filename)
})
mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/blog4')

usersRouter = require('./controllers/users')
app.use('/', usersRouter)

// start listenning
app.listen(9090)
