const suggestion = require("../models/suggestion.model");

exports.viewSuggestions = async (req, res, next) => {
  try {
    const suggestions = await suggestion.find({});
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", 0);
    return res.json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.viewById = async function (req, res, next) {
  suggestion
    .find({ _id: req.params.id })
    .then((suggestions) => {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", 0);
      res.json(suggestions);
    })
    .catch((error) => {
      return error;
    });
};

exports.createSuggestion = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const newsuggestion = new suggestion({
      title,
      description,
    });

    await newsuggestion.save();

    res.status(200).json({ message: "Suggestion created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.countSuggestions = async (req, res, next) => {
  try {
    const suggestionCount = await suggestion.countDocuments({});
    const message = "Success";
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", 0);

    return res.json({ "Suggestion Count": suggestionCount, message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteSuggestion = async (req, res, next) => {
  try {
    const suggestionId = req.params.id;

    const deletedSuggestion = await suggestion.deleteOne({ _id: suggestionId });

    if (deletedSuggestion.deletedCount === 0) {
      return res.status(404).json({ message: "Suggestion not found" });
    }

    res.json({ message: "Suggestion deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updatesuggestion = async (req, res) => {
  const _Id = req.params.id;
  const updated = req.body;
  try {
    const suggestions = await suggestion.findByIdAndUpdate(_Id, { $set: updated }, { new: true });

    if (!suggestions) {
      return res.status(404).send("suggestion not found");
    }

    res.json(suggestions);
  } catch (err) {
    console.error("Error patching suggestion:", err);
    res.status(500).send("Internal server error");
  }
};
