const questions = require('../models/verbalQuestion.model');
const quizzes = require('../models/verbalQuiz.model');


exports.viewVerbalQuestion = async (req, res, next) => {
    try {
      const Questions = await questions.find({});
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      return res.json(Questions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.viewById= async function(req,res,next){
    questions.find({_id:req.params.id}).then((Questions)=>{
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      res.json(Questions);   
      }).catch((error)=>{
      return error;
      })   
};

exports.createVerbalQuestion = async (req, res, next) => {
  try {
    console.log(req.body);
    const { text, options, answer, quizId } = req.body;

    const newQuestion = new questions({
      text,
      options,
      answer,
    });

    await newQuestion.save();

    const quiz = await quizzes.findById(quizId); // Use the correct model name here
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

  exports.countVerbalQuestions = async (req, res, next) => {
    try {
      const questionCount = await questions.countDocuments({});
      const message = "Success";
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
  
      return res.json({"questiomCount": questionCount, message});

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  exports.deleteVerbalQuestions = async (req, res, next) => {
    try {
      const questionId = req.params.id;

      const deletedQuestion = await questions.deleteOne({ _id: questionId });

      if (deletedQuestion.deletedCount === 0) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      res.json({ message: 'Question deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.updateVerbalQuestion= async(req, res) => {
    const _Id = req.params.id;
    const updated = req.body;
    try {
      const question = await questions.findByIdAndUpdate(_Id, {$set:updated},{new:true});
      console.log(question);

      if (!question) {
        return res.status(404).send('question not found');
      }
  
      res.json(question);
    } catch (err) {
      console.error('Error patching aviator:', err);
      res.status(500).send('Internal server error');
    }
  };

