const VerbalQuizResult = require("../models/verbalQuizResult.model");
const VerbalQuiz = require("../models/verbalQuiz.model");

exports.viewVerbalQuizResults = async (req, res, next) => {
  try {
    const results = await VerbalQuizResult.find({}).populate("userId").populate("quizId");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", 0);
    return res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.viewResultById = async (req, res, next) => {
  try {
    const quizId = req.params.quizId;

    const userId = req.user.userId;

    const searchCriteria = {
      $or: [{ quizId }, { _id: quizId }],
      userId,
    };
    if (req.user?.role?.toLowerCase() === "admin") {
      delete searchCriteria.userId;
    }

    const results = await VerbalQuizResult.find(searchCriteria)
      .populate("userId")
      .populate({
        path: "quizId",
        populate: {
          path: "questions",
        },
      });

    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", 0);

    if (results.length === 0) {
      return res.status(404).json({ message: "No verbal quiz results found for this quiz" });
    }
    return res.status(200).json({ results });
  } catch (error) {
    console.error("Error fetching quiz results:", error);
    return res.status(500).json({ message: "An error occurred while fetching results." });
  }
};

exports.createVerbalQuizResult = async (req, res, next) => {
  try {
    const { userId, quizId, answers, marks, totalMarks } = req.body;
    const userIDD = req.user.userId;

    const newResult = new VerbalQuizResult({
      userId: userIDD,
      quizId,
      answers,
      totalMarks,
      marks,
    });
    await newResult.save();
    const quiz = await VerbalQuiz.findById(quizId);
    if (quiz) {
      quiz.attempted = true;
      await quiz.save();
    } else {
      console.warn("Quiz not found, skipping attribute update");
    }
    res.status(200).json({ message: "Verbal Quiz result created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Count all verbal quiz results
// exports.countVerbalQuizResults = async (req, res, next) => {
//     try {
//         const resultCount = await VerbalQuizResult.countDocuments({});
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
exports.deleteVerbalQuizResult = async (req, res, next) => {
  try {
    const resultId = req.params.id;

    const deletedResult = await VerbalQuizResult.findByIdAndDelete(resultId);

    if (!deletedResult) {
      return res.status(404).send("Verbal Quiz result not found");
    }

    res.json({ message: "Verbal Quiz result deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateVerbalQuizResult = async (req, res) => {
  try {
    const resultId = req.params.id;
    const updatedData = req.body;

    const updatedResult = await VerbalQuizResult.findByIdAndUpdate(resultId, updatedData, { new: true });

    if (!updatedResult) {
      return res.status(404).send("Verbal Quiz result not found");
    }
    res.json(updatedResult);
  } catch (err) {
    console.error("Error updating verbal quiz result:", err);
    res.status(500).send("Internal server error");
  }
};
