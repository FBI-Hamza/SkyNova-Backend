const quiz = require('../models/quiz.model');


exports.viewQuizzes = async (req, res, next) => {
    try {
      const quizzes = await quiz.find({}).populate('questions');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache'); 
      res.setHeader('Expires', 0);
      return res.json(quizzes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.viewByTitle = async function(req, res, next) {
    try {
        const quizWithQuestions = await quiz.find({_id:req.params.id}).populate('questions');
        console.log(quizWithQuestions);
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', 0);
        if (!quizWithQuestions) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.json(quizWithQuestions);
    } catch (error) {
        next(error);     
      }
};


exports.createQuiz = async (req, res, next) => {
    try {
      const {title,description,questions,isAttempted } = req.body;

        const newquiz = new quiz({
        title,
        description,
        questions,
        isAttempted
      });
  
      await newquiz.save();
  
      res.status(200).json({ message: 'Quiz created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


  exports.countQuizzes = async (req, res, next) => {
    try {
      const quizCount = await quiz.countDocuments({});
      const message = "Success";
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      return res.json({"Quiz Count": quizCount, message});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  exports.deleteQuiz = async (req, res, next) => {
    try {
      const deletedquiz = await quiz.deleteOne({ _id: req.params.id });

      if (deletedquiz.deletedCount === 0) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
  
      res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.updateQuiz= async(req, res) => {
    const _Id = req.params.id;
    const updated = req.body;
    try {
      const quizzes = await quiz.findByIdAndUpdate( _Id, {$set:updated},{new:true});

      if (!quizzes) {
        return res.status(404).send('Quiz not found');
      }
  
      res.json(quizzes);
    } catch (err) {
      console.error('Error patching quiz:', err);
      res.status(500).send('Internal server error');
    }
  };

