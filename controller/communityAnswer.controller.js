const answer = require('../models/communityAnswer.model');
const question =  require('../models/communityQuestion.model');

exports.viewAnswers = async (req, res, next) => {
    try {
      const answers = await answer.find({});
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      return res.json(answer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.viewById= async function(req,res,next){
      answer.findOne({_id:req.params.id}).then((answers)=>{
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      res.json(answers);   
      }).catch((error)=>{
      return error;
      })   
};

exports.createAnswer = async (req, res, next) => {
  try {
    console.log(req.body);
    const { author,content, questionId } = req.body;

    const newAnswer = new answer({
      author,
      content,
    });

    await newAnswer.save();

    const questions = await question.findById(questionId);
      if (!questions) {
          return res.status(404).json({ message: 'Question not found' });
      }
      questions.answers.push(newAnswer._id);
      await questions.save();

    res.status(200).json({ message: 'Answer Posted'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

  exports.countAnswers = async (req, res, next) => {
    try {
      const answerCount = await answer.countDocuments({});
      const message = "Success";
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
  
      return res.json({"Answer Count": answerCount, message});

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  exports.deleteAnswer = async (req, res, next) => {
    try {
      const answerId = req.params.id;

      const deletedAnswer = await answer.deleteOne({ _id: answerId });

      if (deletedAnswer.deletedCount === 0) {
        return res.status(404).json({ message: 'Answer not found' });
      }
      res.json({ message: 'Answer deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.updateAnswer= async(req, res) => {
    const _Id = req.params.id;
    const updated = req.body;
    try {
      const answers = await answer.findByIdAndUpdate(_Id, {$set:updated},{new:true});

      if (!answers) {
        return res.status(404).send('Answer not found');
      }
      res.json(answers);
    } catch (err) {
      console.error('Error patching answer:', err);
      res.status(500).send('Internal server error');
    }
  };

