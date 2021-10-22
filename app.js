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

//Load config file
dotenv.config({ path: './config/config.env'})

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

//static folder (for public files)
app.use(express.static(path.join(__dirname, 'public')))

//linking routing files from index.js
//Routes
app.use('/', require('./routes/index')) //anything with slash is going to link to index.js file

//going to the config file to find port, if it's not there it will run it on port 5000
const PORT = process.env.PORT || 3000

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)