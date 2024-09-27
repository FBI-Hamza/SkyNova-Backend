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
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    // credentials: true,
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

var usersRouter = require('./routes/users.routes');
var aviatorRouter = require('./routes/aviators.routes');
var jetRouter = require('./routes/jets.routes');
var verbalQuestionRouter = require('./routes/verbalQuestions.routes');
var verbalQuizRouter = require('./routes/verbalQuizzes.routes');
var notificationRouter = require('./routes/notifications.routes');
var certificateRouter = require('./routes/certificates.routes');
var reportRouter = require('./routes/reports.routes');
var resourceRouter = require('./routes/resources.routes');
var warHeroRouter = require('./routes/warhero.routes');
// var resultRouter = require('./routes/results.routes');
var complaintRouter = require('./routes/complaints.routes');
var suggestionRouter = require('./routes/suggestions.routes');
var nonVerbalQuestionRouter = require('./routes/nonVerbalQuestion.routes');
var nonVerbalQuizRouter = require('./routes/nonVerbalQuizzes.routes');
var communityQuestionRouter = require('./routes/communityQuestions.routes');
var communityAnswerRouter = require('./routes/communityAnswers.routes');
var messagesRouter = require('./routes/messages.routes');
var documentaryRouter = require('./routes/documentaries.routes');
var quoteRouter = require('./routes/quotes.routes');
var cockpitRouter = require('./routes/cockpit.routes');
var quizRouter = require('./routes/quiz.routes');
var questionRouter = require('./routes/questions.routes');
var missionRouter = require('./routes/missions.routes');
var medicalDetailsRouter = require('./routes/medicalDetails.routes');
var verbalQuizResultRouter = require('./routes/verbalQuizResults.routes');
var nonVerbalQuizResultRouter = require('./routes/nonVerbalQuizResults.routes');
var finalReport = require('./routes/finalReport.routes');

var mongoose = require('mongoose');
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
// app.use(cors({
//   origin: true,
//   // credentials: true, 
// }));
app.use(cors({
  origin: function(origin, callback){
    return callback(null, true);
  },
  credentials: true
}));
app.use(helmet({
  contentSecurityPolicy: false, 
}));

app.all('/',(req,res)=>{
  res.json("Deployed")
})

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
// app.use('/results', resultRouter);
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
app.use('/questions',questionRouter);
app.use('/missions',missionRouter);
app.use('/medicalDetails',medicalDetailsRouter);
app.use('/verbalQuizResult',verbalQuizResultRouter);
app.use('/nonVerbalQuizResult',nonVerbalQuizResultRouter);
app.use('/finalReports',finalReport);

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

// Import required modules
// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var cors = require('cors');
// const helmet = require('helmet');
// const bodyParser = require('body-parser');
// const http = require('http');
// const socketio = require('socket.io');
// var mongoose = require('mongoose');

// // Initialize Express app
// const app = express();

// // Create HTTP server
// const server = http.createServer(app);

// // Initialize Socket.IO with the HTTP server
// const io = socketio(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//     credentials: true,
//   }
// });

// // Socket.IO connection handling
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Listen for chat messages
//   socket.on('chat message', (msg) => {
//     // Broadcast the message to all connected users
//     io.emit('chat message', msg);
//   });

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// // MongoDB connection
// const dbURI = "mongodb+srv://Developer:developer25@sky-nova.w6bvo.mongodb.net/?retryWrites=true&w=majority&appName=Sky-nova";
// mongoose
//   .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Database Connected..."))
//   .catch((err) => console.log(err));

// // Set up views and static files
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(logger('dev'));
// app.use(express.json({ limit: "100mb" }));
// app.use(bodyParser.json({ limit: "100mb" }));
// app.use(express.urlencoded({ extended: true, parameterLimit: 100000, limit: "100mb" }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true,
// }));
// app.use(helmet({
//   contentSecurityPolicy: false, // If you are using inline scripts or styles
// }));

// // Define routes
// app.use('/users', require('./routes/users.routes'));
// app.use('/aviators', require('./routes/aviators.routes'));
// app.use('/jets', require('./routes/jets.routes'));
// app.use('/verbalQuestions', require('./routes/verbalQuestions.routes'));
// app.use('/verbalQuizzes', require('./routes/verbalQuizzes.routes'));
// app.use('/notifications', require('./routes/notifications.routes'));
// app.use('/certificates', require('./routes/certificates.routes'));
// app.use('/reports', require('./routes/reports.routes'));
// app.use('/resources', require('./routes/resources.routes'));
// app.use('/warHeroes', require('./routes/warhero.routes'));
// app.use('/results', require('./routes/results.routes'));
// app.use('/complaints', require('./routes/complaints.routes'));
// app.use('/suggestions', require('./routes/suggestions.routes'));
// app.use('/nonVerbalQuestions', require('./routes/nonVerbalQuestion.routes'));
// app.use('/nonVerbalQuizzes', require('./routes/nonVerbalQuizzes.routes'));
// app.use('/communityQuestions', require('./routes/communityQuestions.routes'));
// app.use('/communityAnswers', require('./routes/communityAnswers.routes'));
// app.use('/messages', require('./routes/messages.routes'));
// app.use('/documentaries', require('./routes/documentaries.routes'));
// app.use('/quotes', require('./routes/quotes.routes'));
// app.use('/cockpits', require('./routes/cockpit.routes'));
// app.use('/quizzes', require('./routes/quiz.routes'));
// app.use('/questions', require('./routes/questions.routes'));
// app.use('/missions', require('./routes/missions.routes'));

// // Handle 404 errors
// app.all('*', function(req, res, next) {
//   next(createError(404));
// });

// // Error handling middleware
// app.use(function(err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   res.status(err.status || 500);
//   res.render('error');
// });

// // Start the server
// const port = process.env.PORT || 3000;
// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// module.exports = app;
