var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/student');
var authRouter = require('./routes/auth')
var adminRouter = require('./routes/admin')
var app = express();
var cors = require('cors')
app.use(cors({ origin: true, credentials: true }))
var sequelize = require('./db/db.config')

app.use(function(req, res, next) {  
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});  
sequelize.authenticate().then(function(){
  console.log('Connection has been established successfully.');
})
.catch(function(error){
  console.error('Unable to connect to the database:', error);
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',authRouter)
app.use('/',adminRouter)
app.use('/', indexRouter);
app.use('/', usersRouter);


module.exports = app;
