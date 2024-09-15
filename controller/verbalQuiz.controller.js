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

  exports.viewById = async function(req, res, next) {
    try {
        const quizWithQuestions = await quiz.findOne({ _id: req.params.id }).populate('questions');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', 0);
        if (!quizWithQuestions) {
            return res.status(404).json({ message: "Verbal Quiz not found" });
        }
        res.json(quizWithQuestions);
    } catch (error) {
        next(error);     
      }
};

exports.createVerbalQuiz = async (req, res, next) => {
    try {
      console.log(req.body);
      const {title,description,questions,attempted } = req.body;

        const newQuiz = new quiz({
        title,
        description,
        questions,
        attempted
      });
      await newQuiz.save();
  
      res.status(200).json({ message: 'Verbal Quiz created successfully' });
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
  
      return res.json({"Quiz Count": quizCount, message});

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
  
      res.json({ message: 'Verbal Quiz deleted successfully' });
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
      const quizzes = await quiz.findByIdAndUpdate({ _id : title }, updated, { new: true });
      console.log(quizzes);
      if (!quizzes) {
        return res.status(404).send('Verbal Quiz not found');
      }
        res.json(quizzes);
      } catch (err) {
        console.error('Error patching verbal quiz:', err);
        res.status(500).send('Internal server error');
      }
  };

