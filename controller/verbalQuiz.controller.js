const quiz = require('../models/verbalQuiz.model');


exports.viewVerbalQuizzes = async (req, res, next) => {
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
        console.log(req.params);
        const quizWithQuestions = await quiz.findOne({ title: req.params.title }).populate('questions');
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


exports.createVerbalQuiz = async (req, res, next) => {
    try {
      console.log(req.body);
      const {title,description,questions } = req.body;

        const newQuiz = new quiz({
        title,
        description,
        questions,
      });
  
      await newQuiz.save();
  
      res.status(200).json({ message: 'Quiz created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


  exports.countVerbalQuizzes = async (req, res, next) => {
    try {
      const quizCount = await quiz.countDocuments({});
      const message = "Success";
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
  
      return res.json({"quizCount": quizCount, message});

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  exports.deleteVerbalQuiz = async (req, res, next) => {
    try {

      const Quiz = req.params.id;

      const deletedQuiz = await quiz.deleteOne({ _id: Quiz });

      if (deletedQuiz.deletedCount === 0) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
  
      res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.updateVerbalQuiz= async(req, res) => {
    console.log(req.params);
    const title = req.params.title;
    const updated = req.body;
    try {
      const quizzes = await quiz.findOne({ title: title }, updated, { new: true });

      if (!quizzes) {
        return res.status(404).send('Quiz not found');
      }
  
      res.json(quizzes);
    } catch (err) {
      console.error('Error patching quiz:', err);
      res.status(500).send('Internal server error');
    }
  };

