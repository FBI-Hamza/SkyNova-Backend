const questions = require('../models/communityQuestion.model');
const verifyJWT = require('../auth.middleware');

exports.viewCommunityQuestions = async (req, res, next) => {
    try {
      const Questions = await questions.find({}).populate('answers');
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
      questions.find({_id:req.params.id}).populate('answers').then((Questions)=>{
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      res.json(Questions);   
      }).catch((error)=>{
      return error;
      })   
};

// exports.createCommunityQuestion = async (req, res, next) => {
//   try {
//     const { title,body,answer } = req.body;

//     const newQuestion = new questions({
//       title,
//       body,
//       answer,
//     });

//     await newQuestion.save();


//     res.status(200).json({ message: 'Question created', question: newQuestion });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

exports.createCommunityQuestion = async (req, res, next) => {
  try {
      const { title, body, answers } = req.body;
      const userName = req.user.userName;  // Assuming user ID is set by a middleware

      const newQuestion = new questions({
          title,
          body,
          author: userName,
          answers,
      });

      await newQuestion.save();

      res.status(200).json({ message: 'Question created', question: newQuestion });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};

  exports.countCommunityQuestions = async (req, res, next) => {
    try {
      const questionCount = await questions.countDocuments({});
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
  

  exports.deleteCommunityQuestion = async (req, res, next) => {
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

exports.updateCommunityQuestion= async(req, res) => {
    const _Id = req.params.id;
    const updated = req.body;
    try {
      const question = await questions.findByIdAndUpdate(_Id, {$set:updated},{new:true});

      if (!question) {
        return res.status(404).send('question not found');
      }
  
      res.json(question);
    } catch (err) {
      console.error('Error patching question:', err);
      res.status(500).send('Internal server error');
    }
  };

