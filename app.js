//using path module
const path = require('path')
//creating basic express folder
const express =  require('express')
//bring in dotenv
const dotenv = require('dotenv')
//bringing in db connection
const connectDB = require('./config/db');
//bringing in morgan for logging http requests
const morgan = require('morgan')
//bringing in templating engine (handlebars)
const exphbs = require('express-handlebars')
//bringing in passport
const passport = require('passport')
//bringing in session
const session = require('express-session')

//Load config file
dotenv.config({ path: './config/config.env'})

//passport config
//passing in the passport we just brought in as an argument to use within this file
require('./config/passport')(passport) 

connectDB()

//initialize app
const app = express()
//only going to be using morgan if it's in dev mode
if(process.env.NODE_ENV === 'development'){
    //theres different levels of morgan that you can use
    app.use(morgan('dev'))
}

//handlebars
//we have a layout that wraps around everything (has all the html and body tags)
//hbs file type
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//Express Session middleware (needs to be above session middleware)
app.use(session({
    secret: 'keyboard cat',
    resave: false, //we don't want to save a session if nothing is verified
    saveUninitialized: false,
    //later on we will put a store value inside here
  }))

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//static folder (for public files)
app.use(express.static(path.join(__dirname, 'public')))

//linking routing files from index.js
//Routes
app.use('/', require('./routes/index')) //anything with slash is going to link to index.js file
app.use('/auth', require('./routes/auth')) //anything with /auth will be linked to this file 


//going to the config file to find port, if it's not there it will run it on port 5000
const PORT = process.env.PORT || 3000

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)