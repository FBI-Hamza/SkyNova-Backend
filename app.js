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
const bodyParser = require('body-parser');
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(express);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for chat messages
  socket.on('chat message', (msg) => {
    // Broadcast the message to all connected users
    io.emit('chat message', msg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

//Routers
var usersRouter = require('./routes/users.routes');
var aviatorRouter = require('./routes/aviators.routes');
var jetRouter = require('./routes/jets.routes');
var verbalQuestionRouter = require('./routes/verbalQuestions.routes');
<<<<<<< HEAD
var verbalQuizRouter = require('./routes/verbalQuizzes.routes');
=======
var verbalQuizRouter = require('./routes/verbalQuiz.Routes');
>>>>>>> c2997afbe6b936861910b412ff018f31275eb533
var notificationRouter = require('./routes/notifications.routes');
var certificateRouter = require('./routes/certificates.routes');
var reportRouter = require('./routes/reports.routes');
var resourceRouter = require('./routes/resources.routes');
var warHeroRouter = require('./routes/warhero.routes');
var resultRouter = require('./routes/results.routes');
var complaintRouter = require('./routes/complaints.routes');
var suggestionRouter = require('./routes/suggestions.routes');
var nonVerbalQuestionRouter = require('./routes/nonVerbalQuestion.routes');
<<<<<<< HEAD
var nonVerbalQuizRouter = require('./routes/nonVerbalQuizzes.routes');
var communityQuestionRouter = require('./routes/communityQuestions.routes');
var communityAnswerRouter = require('./routes/communityAnswers.routes');
var messagesRouter = require('./routes/messages.routes');
var documentaryRouter = require('./routes/documentaries.routes');
var quoteRouter = require('./routes/quotes.routes');
var cockpitRouter = require('./routes/cockpit.routes');
var quizRouter = require('./routes/quiz.routes');
var missionRouter = require('./routes/missions.routes');

=======
  
>>>>>>> c2997afbe6b936861910b412ff018f31275eb533
var mongoose = require('mongoose');
var app = express();
var dbURI = "mongodb+srv://Developer:developer25@sky-nova.w6bvo.mongodb.net/?retryWrites=true&w=majority&appName=Sky-nova";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Server Started..."))
  .catch((err) => console.log(err));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'));
app.use(logger('dev'));
app.use(express.json({limit:"100mb"}));
app.use(bodyParser.json({limit:"100mb"}));
app.use(express.urlencoded({ extended: true,parameterLimit:100000,limit:"100mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(helmet()); 

app.all('/',(req,res)=>{
  res.json({"hello":"world"})
})

<<<<<<< HEAD
//Routes
=======
app.all('/',(req,res)=>{
  res.json({"hello":"world"})
});

>>>>>>> c2997afbe6b936861910b412ff018f31275eb533
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
<<<<<<< HEAD
app.use('/complaints',complaintRouter);
app.use('/suggestions',suggestionRouter);
app.use('/nonVerbalQuestions',nonVerbalQuestionRouter);
app.use('/nonVerbalQuizzes',nonVerbalQuizRouter);
app.use('/communityQuestions',communityQuestionRouter);
app.use('/communityAnswers',communityAnswerRouter);
app.use('/messages',messagesRouter);
app.use('/documentaries',documentaryRouter);
app.use('/quotes',quoteRouter);
app.use('/cockpits',cockpitRouter);
app.use('/quizzes',quizRouter);
app.use('/missions',missionRouter);
=======
app.use('/complaints',complaintRouter)
app.use('/suggestions',suggestionRouter)
app.use('/nonVerbalQuestion',nonVerbalQuestionRouter)
>>>>>>> c2997afbe6b936861910b412ff018f31275eb533

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
