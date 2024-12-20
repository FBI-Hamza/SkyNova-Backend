const medicalDetails = require("../models/medicalDetails.model");
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const config = require("../firebase.config");
const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);
// var mongoose = require("mongoose");

exports.viewMedicalDetails = async (req, res, next) => {
  try {
    const medicalDetailss = await medicalDetails.find({}).populate("userId");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", 0);
    return res.json(medicalDetailss);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// exports.viewById= async function(req,res,next){
//   const {userId} = req.body;
//   console.log(userId);
//   const userIDD = userId;
//     medicalDetails.findOne({userIDD}).populate('userId').then((medicalDetailss)=>{
//       console.log(medicalDetailss);
//       res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
//       res.setHeader('Pragma', 'no-cache');
//       res.setHeader('Expires', 0);
//       res.json(medicalDetailss);
//       }).catch((error)=>{
//       return error;
//       })
// };

exports.viewById = async function (req, res, next) {
  try {
    const { userId } = req.body;
    console.log(userId);

    const medicalDetailsRecord = await medicalDetails.findOne({ userId }).populate("userId");

    if (!medicalDetailsRecord) {
      return res.status(404).json({ message: "Medical details not found" });
    }

    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", 0);
    res.json(medicalDetailsRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving medical details", error });
  }
};

// exports.createMedicalDetails = async (req, res, next) => {
//     try {
//       const {eyesight,height,weight} = req.body;

//         const newMedicalDetails = new medicalDetails({
//         eyesight,
//         height,
//         weight,
//       });

//       await newMedicalDetails.save();

//       res.status(200).json({ message: 'medicalDetails created successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   };
exports.createMedicalDetails = async (req, res, next) => {
  try {
    console.log(req.body);
    const { eyesight, height, weight, weightUnit, heightUnit } = req.body;
    const userIDD = req.user.userId;
    let fileUrl = "";
    if (req.file) {
      const dateTime = giveCurrentDateTime();
      const storageRef = ref(storage, `MedicalFiles/${req.file.originalname}-${dateTime}`);
      const metadata = { contentType: req.file.mimetype };

      const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
      fileUrl = await getDownloadURL(snapshot.ref);
    }

    const newMedicalDetails = new medicalDetails({
      userId: userIDD,
      eyesight,
      height,
      weight,
      weightUnit,
      heightUnit,
      medicalReport: fileUrl,
    });

    await newMedicalDetails.save();

    res.status(200).json({ message: "Medical details created successfully", medicalDetails: newMedicalDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const giveCurrentDateTime = () => {
  const today = new Date();
  const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};

// exports.countmedicalDetailss = async (req, res, next) => {
//   try {
//     const medicalDetailsCount = await medicalDetails.countDocuments({});
//     const message = "Success";
//     res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
//     res.setHeader('Pragma', 'no-cache');
//     res.setHeader('Expires', 0);

//     return res.json({"medicalDetailsCount": medicalDetailsCount, message});

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

exports.deletemedicalDetails = async (req, res, next) => {
  try {
    const medicalDetailsId = req.params.id;

    const deletedmedicalDetails = await medicalDetails.findByIdAndDelete(medicalDetailsId);

    if (!deletedmedicalDetails) {
      return res.status(404).json({ message: "medicalDetails not found" });
    }

    res.json({ message: "medicalDetails deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updatemedicalDetails = async (req, res) => {
  const _Id = req.params.id;
  const updated = req.body;
  try {
    const medicalDetailss = await medicalDetails.findByIdAndUpdate(_Id, { $set: updated }, { new: true });

    if (!medicalDetailss) {
      return res.status(404).send("medical Details not found");
    }

    res.json(medicalDetailss);
  } catch (err) {
    console.error("Error patching medical Details:", err);
    res.status(500).send("Internal server error");
  }
};
