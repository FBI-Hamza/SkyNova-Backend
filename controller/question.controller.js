const question  = require('../models/question.model');
const quizzes = require('../models/quiz.model');
// const { initializeApp } = require('firebase/app');
// const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
// const multer = require('multer');
// const config = require('../firebase.config');
// const app = initializeApp(config.firebaseConfig);
// const storage = getStorage(app);

exports.viewQuestions = async (req, res, next) => {
    try {
      const questions  = await question.find({});
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      return res.json(questions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.viewById= async function(req,res,next){
      question.findOne({_id:req.params.id}).then((questions)=>{
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      res.json(questions);   
      }).catch((error)=>{
      return error;
      })   
};

// exports.createquestion = async (req, res, next) => {
//   try {
//       const { quizId } = req.body;
//       const { questionImg, optionsImgs, answerImg} = req.files;
//       const questionRef = ref(storage, `questions/${questionImg.originalname}`);
//       await uploadBytesResumable(questionRef, questionImg.buffer);
//       const questionURL = await getDownloadURL(questionRef);

//       const optionsImageURLs = [];
//       if (optionsImgs && optionsImgs.length > 0) {
//           for (const optionImage of optionsImgs) {
//               const optionImageRef = ref(storage, `questions/${optionImage.originalname}`);
//               await uploadBytesResumable(optionImageRef, optionImage.buffer);
//               const optionImageURL = await getDownloadURL(optionImageRef);
//               optionsImageURLs.push(optionImageURL);
//           }
//       }

//       const answerRef = ref(storage, `questions/${answerImg.originalname}`);
//       await uploadBytesResumable(answerRef, answerImg.buffer);
//       const answerURL = await getDownloadURL(answerRef);

//       const question = questionURL;
//       const options = optionsImageURLs;
//       const answer = answerURL;

//       const newQuestion = new question({
//           question,
//           options,
//           answer,
//       });

//       await newQuestion.save();

//       const quiz = await quiz.findById(quizId);
//       if (!quiz) {
//           return res.status(404).json({ message: 'Quiz not found' });
//       }
//       quiz.questions.push(newQuestion._id);
//       await quiz.save();

//       res.status(200).json({ message: 'Question created and added to the quiz successfully', question: newQuestion });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error' });
//   }
// };

exports.createQuestion = async (req, res, next) => {
    try {
      console.log(req.body);
      const { text, options, answer, quizId } = req.body;
  
      const newQuestion = new question({
        text,
        options,
        answer,
      });
  
      await newQuestion.save();
  
      const quiz = await quizzes.findById(quizId); 
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
  
      quiz.questions.push(newQuestion._id);
      await quiz.save();
  
      res.status(200).json({ message: 'Question created and added to the quiz successfully', question: newQuestion });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.countQuestions = async (req, res, next) => {
    try {
      const questionCount = await question.countDocuments({});
      const message = "Success";
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
  
      return res.json({"Question Count": questionCount, message});

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  exports.deleteQuestion  = async (req, res, next) => {
    try {
      const questionId = req.params.id;

      const deletedQuestion = await question.deleteOne({ _id: questionId });

      if (deletedQuestion.deletedCount === 0) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      res.json({ message: 'Question deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.updateQuestion= async(req, res) => {
    const _Id = req.params.id;
    const updated = req.body;
    console.log(updated);
    try {
      const questions = await question.findByIdAndUpdate(_Id, {$set:updated},{new:true});

      if (!questions) {
        return res.status(404).send('Question not found');
      }
  
      res.json(questions);
    } catch (err) {
      console.error('Error Patching Question:', err);
      res.status(500).send('Internal server error');
    }
  };

