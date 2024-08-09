//Http-errors simplifies the creation of HTTP error objects
var createError = require('http-errors');
var express = require('express');
var path = require('path');
//CookieParser middleware to handle cookies in your app.
var cookieParser = require('cookie-parser');
//Morgan middleware to log HTTP requests
var logger = require('morgan');
//CORS middleware to handle cross origin requests.
var cors = require('cors');
//Helmet middleware to enhance security by providing various http headers.
const helmet = require('helmet');

var usersRouter = require('./routes/users.routes');
var aviatorRouter = require('./routes/aviators.routes');
var jetRouter = require('./routes/jets.routes');
var verbalQuestionRouter = require('./routes/verbalQuestions.routes');
var verbalQuizRouter = require('./routes/verbalQuiz.Routes');
var notificationRouter = require('./routes/notifications.routes');
var certificateRouter = require('./routes/certificates.routes');
var reportRouter = require('./routes/reports.routes');
var resourceRouter = require('./routes/resources.routes');
var warHeroRouter = require('./routes/warhero.routes');
var resultRouter =require('./routes/results.routes');
var complaintRouter = require('./routes/complaints.routes');
var suggestionRouter = require('./routes/suggestions.routes');
var nonVerbalQuestionRouter = require('./routes/nonVerbalQuestion.routes');
// var nonVerbalQuizRouter = require('./routes/nonverbalQuiz.Routes');
  
var mongoose = require('mongoose');
const nonVerbalQuestionModel = require('./models/nonVerbalQuestion.model');

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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(helmet()); 


// app.all('/',(req,res)=>{
//   res.json({"hello":"world"})
// })7

app.use('/users', usersRouter);
app.use('/aviators', aviatorRouter);
app.use('/jets', jetRouter);
app.use('/verbalQuestions', verbalQuestionRouter);
app.use('/verbalQuizzes', verbalQuizRouter);
app.use('/notifications', notificationRouter);
app.use('/reports', reportRouter);
app.use('/certificates', certificateRouter);
app.use('/resources', resourceRouter);
app.use('/warHeroes', warHeroRouter);
app.use('/results', resultRouter);
app.use('/complaints',complaintRouter)
app.use('/suggestions',suggestionRouter)
app.use('/nonVerbalQuestion',nonVerbalQuestionRouter)
// app.use('/nonVerbalQuiz',nonVerbalQuizRouter)

app.all('*',function(req, res, next) {
  next(createError(404));
});


//This middleware captures errors, sets local variables for error handling, specifies an appropriate HTTP status code, and renders an error view. 
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
