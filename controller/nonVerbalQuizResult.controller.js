const nonVerbalQuizResult = require('../models/nonVerbalQuizResult.model'); // Adjust the path as necessary

exports.viewNonVerbalQuizResults = async (req, res, next) => {
    try {
        
        const results = await nonVerbalQuizResult.find({}).populate('userId quizId');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', 0);
        return res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// View verbal quiz result by ID
exports.viewResultById = async (req, res, next) => {
    try {
        const result = await nonVerbalQuizResult.findOne({ _id: req.params.id }).populate('userId quizId');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', 0);
        if (!result) {
            return res.status(404).json({ message: "Verbal Quiz result not found" });
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

// Create a new verbal quiz result
exports.createNonVerbalQuizResult = async (req, res, next) => {
    try {
        const {  quizId, score,marks } = req.body;
        const userIDD = req.user.userId;
        const newResult = new nonVerbalQuizResult({
            userId:userIDD,
            quizId,
            marks,
            answers
        });
        await newResult.save();

        res.status(200).json({ message: 'Non Verbal Quiz result created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Count all verbal quiz results
// exports.countnonVerbalQuizResults = async (req, res, next) => {
//     try {
//         const resultCount = await nonVerbalQuizResult.countDocuments({});
//         const message = "Success";
//         res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
//         res.setHeader('Pragma', 'no-cache');
//         res.setHeader('Expires', 0);

//         return res.json({ "Result Count": resultCount, message });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// Delete a verbal quiz result
exports.deleteNonVerbalQuizResult = async (req, res, next) => {
    try {
        const resultId = req.params.id;

        const deletedResult = await nonVerbalQuizResult.deleteOne({ _id: resultId });

        if (deletedResult.deletedCount === 0) {
            return res.status(404).json({ message: 'Result not found' });
        }

        res.json({ message: 'Verbal Quiz result deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateNonVerbalQuizResult = async (req, res) => {
    try {
        const resultId = req.params.id;
        const updatedData = req.body;

        const updatedResult = await nonVerbalQuizResult.findByIdAndUpdate(resultId, updatedData, { new: true });

        if (!updatedResult) {
            return res.status(404).send('Verbal Quiz result not found');
        }
        res.json(updatedResult);
    } catch (err) {
        console.error('Error updating verbal quiz result:', err);
        res.status(500).send('Internal server error');
    }
};
