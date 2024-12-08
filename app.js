//Http-errors simplifies the creation of HTTP error objects
var createError = require("http-errors");
var express = require("express");
var path = require("path");
//CookieParser middleware to handle cookies in your app.
var cookieParser = require("cookie-parser");
//Morgan middleware to log HTTP requests
var logger = require("morgan");
//CORS middleware to handle cross origin requests.
var cors = require("cors");
//Helmet middleware to enhance security by providing various http headers.
const helmet = require("helmet");
const bodyParser = require("body-parser");
const http = require("http");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;
const messageModel = require("./models/message.model");

const io = socketio(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let users = new Map();

setInterval(() => {
  console.log("Users", users);
}, 5000);

io.on("connection", (socket) => {
  const userID = socket.handshake.query.userId;

  if (userID) {
    // users[userID] = socket.id;
    users.set(userID, socket.id);
    console.log(`User ${userID} automatically connected with socket ID ${socket.id}`);
  } else {
    console.log("UserID not provided, cannot track user");
  }

  socket.on("chat message", async ({ senderID, receiverID, content, type = "text", status = "sent" }) => {
    console.log("Message Received", { senderID, receiverID, content, type, status });

    const recipientSocketID = users.get(receiverID);
    if (recipientSocketID) {
      io.to(recipientSocketID).emit("chat message", {
        senderID,
        receiverID,
        content,
        type,
        status,
      });
    } else {
      console.log("User not connected");
    }

    try {
      const newMessage = new messageModel({
        senderID,
        receiverID,
        content,
        type,
        status,
      });

      await newMessage.save();
      console.log("Message saved to the database");
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    users.delete(userID);
  });
});

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

var usersRouter = require("./routes/users.routes");
var aviatorRouter = require("./routes/aviators.routes");
var jetRouter = require("./routes/jets.routes");
var verbalQuestionRouter = require("./routes/verbalQuestions.routes");
var verbalQuizRouter = require("./routes/verbalQuizzes.routes");
var notificationRouter = require("./routes/notifications.routes");
var certificateRouter = require("./routes/certificates.routes");
var reportRouter = require("./routes/reports.routes");
var resourceRouter = require("./routes/resources.routes");
var warHeroRouter = require("./routes/warHero.routes");
var wingsOfGloryResourceRouter = require("./routes/wingsOfGloryResources.routes");
var resultRouter = require("./routes/results.routes");
var complaintRouter = require("./routes/complaints.routes");
var suggestionRouter = require("./routes/suggestions.routes");
var nonVerbalQuestionRouter = require("./routes/nonVerbalQuestion.routes");
var nonVerbalQuizRouter = require("./routes/nonVerbalQuizzes.routes");
var communityQuestionRouter = require("./routes/communityQuestions.routes");
var communityAnswerRouter = require("./routes/communityAnswers.routes");
var messagesRouter = require("./routes/messages.routes");
// var documentaryRouter = require('./routes/documentaries.routes');
// var quoteRouter = require('./routes/quotes.routes');
var cockpitRouter = require("./routes/cockpit.routes");
var quizRouter = require("./routes/quiz.routes");
var questionRouter = require("./routes/questions.routes");
var missionRouter = require("./routes/missions.routes");
var medicalDetailsRouter = require("./routes/medicalDetails.routes");
var verbalQuizResultRouter = require("./routes/verbalQuizResults.routes");
var nonVerbalQuizResultRouter = require("./routes/nonVerbalQuizResults.routes");
var finalReport = require("./routes/finalReport.routes");

var mongoose = require("mongoose");
var dbURI =
  "mongodb+srv://Developer:developer25@sky-nova.w6bvo.mongodb.net/?retryWrites=true&w=majority&appName=Sky-nova";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Server Started..."))
  .catch((err) => console.log(err));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
// app.set('port', process.env.PORT || 3000);
server.listen(PORT);
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, parameterLimit: 100000, limit: "100mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(cors({
//   origin: true,
//   // credentials: true,
// }));

// const corsOptions = {
//   origin: function(origin, callback){
//     return callback(null, true);
//   },
//   credentials: true
// };

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.all("/", (req, res) => {
  res.json("Deployed");
});

app.use("/users", usersRouter);
app.use("/aviators", aviatorRouter);
app.use("/jets", jetRouter);
app.use("/verbalQuestions", verbalQuestionRouter);
app.use("/verbalQuizzes", verbalQuizRouter);
app.use("/notifications", notificationRouter);
app.use("/reports", reportRouter);
app.use("/certificates", certificateRouter);
app.use("/resources", resourceRouter);
app.use("/warHeroes", warHeroRouter);
app.use("/wingsOfGloryResources", wingsOfGloryResourceRouter);
app.use("/results", resultRouter);
app.use("/complaints", complaintRouter);
app.use("/suggestions", suggestionRouter);
app.use("/nonVerbalQuestions", nonVerbalQuestionRouter);
app.use("/nonVerbalQuizzes", nonVerbalQuizRouter);
app.use("/communityQuestions", communityQuestionRouter);
app.use("/communityAnswers", communityAnswerRouter);
app.use("/messages", messagesRouter);
// app.use('/documentaries',documentaryRouter);
// app.use('/quotes',quoteRouter);
app.use("/cockpits", cockpitRouter);
app.use("/quizzes", quizRouter);
app.use("/questions", questionRouter);
app.use("/missions", missionRouter);
app.use("/medicalDetails", medicalDetailsRouter);
app.use("/verbalQuizResult", verbalQuizResultRouter);
app.use("/nonVerbalQuizResult", nonVerbalQuizResultRouter);
app.use("/finalReports", finalReport);

app.all("*", function (req, res, next) {
  next(createError(404));
});

app.use((req, res, next) => {
  console.log("Request Body:", req.body);
  next();
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
    title: "Error",
  });
});

module.exports = app;
