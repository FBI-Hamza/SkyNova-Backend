var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const helmet = require('helmet');

var usersRouter = require('./routes/users.routes');
var aviatorRouter = require('./routes/aviators.routes');
var jetRouter = require('./routes/jets.routes');

var mongoose = require('mongoose');

var app = express();

mongoose
  .connect("mongodb://0.0.0.0:27017/Skynova")
  .then(() => console.log("MongoDB connection established"))
  .catch((err) => console.log(err));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', 3000);
app.listen(app.get('port'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(helmet()); 


app.all('/',(req,res)=>{
  res.json({"hello":"world"})
})

app.use('/users', usersRouter);
app.use('/aviators', aviatorRouter);
app.use('/jets', jetRouter);


app.all('*',function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
