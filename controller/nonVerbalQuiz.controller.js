const nonVerbalQuestionModel = require("../models/nonVerbalQuestion.model");
const nonVerbalQuiz = require("../models/nonVerbalQuiz.model");
const base64ToBlob = require("../base64toblob");
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");

const config = require("../firebase.config");
const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);

exports.viewNonVerbalQuizzes = async (req, res, next) => {
  try {
    const nonVerbalQuizzes = await nonVerbalQuiz.find({}).populate("questions");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", 0);
    return res.json(nonVerbalQuizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.viewByTitle = async function (req, res, next) {
  try {
    console.log(req.params);
    const nonVerbalQuizWithQuestions = await nonVerbalQuiz.findOne({ _id: req.params.title }).populate("questions");
    console.log(nonVerbalQuizWithQuestions);
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", 0);
    if (!nonVerbalQuizWithQuestions) {
      return res.status(404).json({ message: "Non Verbal Quiz not found" });
    }
    res.json(nonVerbalQuizWithQuestions);
  } catch (error) {
    next(error);
  }
};

// exports.createNonVerbalQuiz = async (req, res, next) => {
//     try {
//       console.log(req.body);
//       const {title,description,questions } = req.body;

//         const newNonVerbalQuiz = new nonVerbalQuiz({
//         title,
//         description,
//         questions,
//       });

//       await newNonVerbalQuiz.save();

//       res.status(200).json({ message: 'Non Verbal Quiz created successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   };

exports.createNonVerbalQuiz = async (req, res, next) => {
  try {
    console.log(req.body);
    const { title, description, questions, attempted } = req.body;

    const newNonVerbalQuiz = new nonVerbalQuiz({
      title,
      description,
      questions,
      attempted,
    });

    const savedQuiz = await newNonVerbalQuiz.save();

    res.status(200).json({
      message: "Non Verbal Quiz created successfully",
      quizId: savedQuiz._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.countNonVerbalQuizzes = async (req, res, next) => {
  try {
    const nonVerbalQuizCount = await nonVerbalQuiz.countDocuments({});
    const message = "Success";
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", 0);

    return res.json({ NonVerbalQuizCount: nonVerbalQuizCount, message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteNonVerbalQuiz = async (req, res, next) => {
  try {
    const nonVerbalQuizId = req.params.id;

    const deletedNonVerbalQuiz = await nonVerbalQuiz.deleteOne({ _id: nonVerbalQuizId });

    if (deletedNonVerbalQuiz.deletedCount === 0) {
      return res.status(404).json({ message: "Non Verbal Quiz not found" });
    }

    res.json({ message: "Non Verbal Quiz deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateNonVerbalQuiz = async (req, res) => {
  const _Id = req.params.id;
  const updated = req.body;
  try {
    const nonVerbalQuizzes = await nonVerbalQuiz.findByIdAndUpdate(_Id, { $set: updated }, { new: true });

    if (!nonVerbalQuizzes) {
      return res.status(404).send("Non Verbal Quiz not found");
    }

    const questions = req.body.questions;
    await Promise.all(
      questions.map(async (question) => {
        let questionImgValue;
        const image = question.image;
        if (image && image.length > 0 && image.includes("data:image")) {
          const blob = base64ToBlob(image, "image/png");
          const questionRef = ref(storage, `nonVerbalQuestions/${Date.now()}-${blob.originalname}`);
          await uploadBytesResumable(questionRef, blob);
          questionImgValue = await getDownloadURL(questionRef);
        }

        const optionsWithImages = options.map(async (option) => {
          if (option.image && option.image.length > 0 && option.image.includes("data:image")) {
            const blob = base64ToBlob(option.image, "image/png");
            const optionImageRef = ref(storage, `nonVerbalQuestions/${Date.now()}-${blob.name}`);
            await uploadBytesResumable(optionImageRef, blob);
            const optionImageURL = await getDownloadURL(optionImageRef);
            return { label: option.label, image: optionImageURL };
          }
          return { label: option.label };
        });

        const resolvedOptionsWithImages = await Promise.all(optionsWithImages);

        await nonVerbalQuestionModel.findByIdAndUpdate(question._id, {
          $set: { ...question, image: questionImgValue, options: resolvedOptionsWithImages },
        });
      })
    );

    res.json(nonVerbalQuizzes);
  } catch (err) {
    console.error("Error patching nonVerbalQuiz:", err);
    res.status(500).send("Internal server error");
  }
};
