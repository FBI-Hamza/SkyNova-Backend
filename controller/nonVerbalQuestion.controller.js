const nonVerbalQuestion  = require('../models/nonVerbalQuestion.model');
const nonVerbalQuiz = require('../models/nonVerbalQuiz.model');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const multer = require('multer');
const config = require('../firebase.config');
const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);

exports.viewNonVerbalQuestion = async (req, res, next) => {
    try {
      const nonVerbalQuestions  = await nonVerbalQuestion.find({});
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      return res.json(nonVerbalQuestions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.viewById= async function(req,res,next){
    nonVerbalQuestion.find({_id:req.params.id}).then((nonVerbalQuestions)=>{
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      res.json(nonVerbalQuestions);   
      }).catch((error)=>{
      return error;
      })   
};

exports.createNonVerbalQuestion = async (req, res, next) => {
  try {
      const { question, options, answer, quizId } = req.body;

      const questionRef = ref(storage, `nonVerbalQuestions/${question.originalname}`);
      await uploadBytesResumable(questionRef, question.buffer);
      const questionURL = await getDownloadURL(questionRef);

      const optionsImageURLs = [];
      if (options && options.length > 0) {
          for (const optionImage of options) {
              const optionImageRef = ref(storage, `nonVerbalQuestions/${optionImage.originalname}`);
              await uploadBytesResumable(optionImageRef, optionImage.buffer);
              const optionImageURL = await getDownloadURL(optionImageRef);
              optionsImageURLs.push(optionImageURL);
          }
      }

      const answerRef = ref(storage, `nonVerbalQuestions/${answer.originalname}`);
      await uploadBytesResumable(answerRef, answer.buffer);
      const answerURL = await getDownloadURL(answerRef);

      const newQuestion = new nonVerbalQuestion({
          questionURL,
          optionsImageURLs,
          answerURL,
      });

      await newQuestion.save();

      const quiz = await quizzes.findById(quizId);
      if (!quiz) {
          return res.status(404).json({ message: 'Quiz not found' });
      }
      quiz.nonVerbalQuestions.push(newQuestion._id);
      await quiz.save();

      res.status(200).json({ message: 'Question created and added to the quiz successfully', question: newQuestion });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};

const giveCurrentDateTime = () => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
};

  exports.countNonVerbalQuestions = async (req, res, next) => {
    try {
      const questionCount = await nonVerbalQuestion.countDocuments({});
      const message = "Success";
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
  
      return res.json({"Non Verbal Question Count": questionCount, message});

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  exports.deleteNonVerbalQuestion  = async (req, res, next) => {
    try {
      const questionId = req.params.id;

      const deletedQuestion = await nonVerbalQuestion.deleteOne({ _id: questionId });

      if (deletedQuestion.deletedCount === 0) {
        return res.status(404).json({ message: 'Non Verbal Question not found' });
      }
  
      res.json({ message: 'Non Verbal Question deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.updateNonVerbalQuestion= async(req, res) => {
    const _Id = req.params.id;
    const updated = req.body;
    try {
      const question = await nonVerbalQuestion.findByIdAndUpdate(_Id, {$set:updated},{new:true});
      console.log(question);

      if (!question) {
        return res.status(404).send('Question not found');
      }
  
      res.json(question);
    } catch (err) {
      console.error('Error Patching Question:', err);
      res.status(500).send('Internal server error');
    }
  };

