const express = require('express')
const path = require("path")
const exphbs = require("express-handlebars")
// print date and time
const moment = require('moment')
const router = require('./routes/api/router')
const members = require('./routes/api/members')
console.log(members);

const app = express()


const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next()
}

// Init middleware
app.use(logger)

// Handle bars engine
app.engine('handlebars',exphbs({defaultLayout: 'main'}))
app.set('view engine' , 'handlebars')

// Body Parser middleware
app.use(express.json())
app.use(express.urlencoded({extended : false}))

// HomePage Route
app.get('/',(req,res) => res.render('index',{title: "Members App",members :members}))

// Set Static Folder
app.use(express.static(path.join(__dirname,"public")))




app.use('/api/members',require('./routes/api/router'))

/*app.get('/', (req,res) => {
   // res.send("<h1>Hello World !!! !!!!</h1>");
   res.sendFile(path.join(__dirname,'public','index.html'))
}) */

const PORT = process.env.PORT || 8081

app.listen(PORT, () => {
    console.log("Server started on port : ", PORT);
})