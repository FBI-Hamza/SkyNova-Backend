const Jet = require('../models/jet.model'); 
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const config = require('../firebase.config');
const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);


const createJet = async (req, res) => {
  try {
    const dateTime = giveCurrentDateTime();
    const storageRef = ref(storage, `JETS/${req.file.originalname} ${dateTime}`);
    const metadata = {
      contentType: req.file.mimetype,
    };

    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    const imageURL = await getDownloadURL(snapshot.ref);
    
    const { name, description} = req.body;
    const newJet = new Jet({
      name,
      description,
      imageURL,
    });

    await newJet.save();
    res.status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const giveCurrentDateTime = () => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
};

const viewJets = async (req, res, next) => {
  try {
    const jets = await Jet.find({ });
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0);
    res.json(jets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const jetViewById= async (req,res,next)=>{
  Jet.find({_id:req.params.id}).then((jet)=>{
     return res.json(jet);   
     }).catch((error)=>{
     return error;
     })   
};

const deleteJet = async (req, res, next) => {
  try {
    const jetId = req.params.id;

    const deletedJet = await Jet.deleteOne({_id: jetId});

    if (deletedJet.deletedCount === 0) {
      return res.status(404).json({ message: 'jet not found' });
    }

    res.json({ message: 'Jet deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createJet,
  viewJets,
  deleteJet,
  jetViewById,
};