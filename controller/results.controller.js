const Result = require('../models/result.model'); 
const Quiz = require('../models/quiz.model'); 

exports.viewQuizResults = async (req, res, next) => {
    try {
        const results = await Result.find({}).populate('userId').populate({ 
            path: 'quizId', 
            populate: { 
                path: 'questions' 
            } 
        });;
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', 0);
        return res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.viewResultById = async (req, res, next) => {
    try {
        const quizId = req.params.quizId; 
        const userId = req.user.userId; 

        const results = await Result
            .find({ quizId,userId })
            .populate('userId')
            .populate({ 
                path: 'quizId', 
                populate: { 
                    path: 'questions' 
                } 
            });

        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', 0);
        
        if (results.length === 0) {
            return res.status(404).json({ message: "No quiz results found for this quiz" });
        }
        return res.status(200).json({ results });
    } catch (error) {
        console.error("Error fetching quiz results:", error);
        return res.status(500).json({ message: "An error occurred while fetching results." });
    }
};

exports.createQuizResult = async (req, res, next) => {
    try {
        const { quizId, answers,marks } = req.body;
        const userIDD = req.user.userId;

        const newResult = new Result({
            userId:userIDD,
            quizId,
            answers,
            marks

        });
        await newResult.save();
        const quiz = await Quiz.findById(quizId);
        if (quiz) {
            quiz.attempted = true; 
        await quiz.save();
        } else {
        console.warn('Quiz not found, skipping attribute update');
        }
        res.status(200).json({ message: 'Verbal Quiz result created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.countQuizResults = async (req, res, next) => {
    try {
        const resultCount = await Result.countDocuments({});
        const message = "Success";
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', 0);

        return res.json({ "Result Count": resultCount, message });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a verbal quiz result
exports.deleteQuizResult = async (req, res, next) => {
    try {
        const resultId = req.params.id;

        const deletedResult = await Result.deleteOne({ _id: resultId });

        if (deletedResult.deletedCount === 0) {
            return res.status(404).json({ message: 'Result not found' });
        }

        res.json({ message: 'Verbal Quiz result deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateQuizResult = async (req, res) => {
    try {
        const resultId = req.params.id;
        const updatedData = req.body;

        const updatedResult = await Result.findByIdAndUpdate(resultId, updatedData, { new: true });

        if (!updatedResult) {
            return res.status(404).send('Verbal Quiz result not found');
        }
        res.json(updatedResult);
    } catch (err) {
        console.error('Error updating verbal quiz result:', err);
        res.status(500).send('Internal server error');
    }
};
