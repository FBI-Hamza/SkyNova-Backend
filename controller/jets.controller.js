const jet = require('../models/jet.model'); 
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const config = require('../firebase.config');
const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);


const createJet = async (req, res) => {
  try {
    const dateTime = giveCurrentDateTime();
    const storageRef = ref(storage, `Jets/${req.file.originalname} ${dateTime}`);
    const metadata = {
      contentType: req.file.mimetype,
    };

    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    const imageURL = await getDownloadURL(snapshot.ref);
    const { name, description, jetLink} = req.body;
    const newJet = new jet({
      name,
      description,
      jetImage:imageURL,
      jetLink,
    });
    await newJet.save();
    res.json({ message: 'Jet added successfully' }); 
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
    const jets = await jet.find({ });
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
  jet.findOne({_id:req.params.id}).then((jet)=>{
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0); 
    return res.json(jet);   
     }).catch((error)=>{
     return error;
     })   
};

const countJets = async (req, res, next) => {
  try {
    const jetCount = await jet.countDocuments({});
    const message = "Success";
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0);

    return res.json({"Jet Count": jetCount, message});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteJet = async (req, res, next) => {
  try {
    const jetId = req.params.id;

    const deletedJet = await jet.deleteOne({_id: jetId});

    if (deletedJet.deletedCount === 0) {
      return res.status(404).json({ message: 'jet not found' });
    }

    res.json({ message: 'Jet deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateJet = async (req, res) => {
const _Id = req.params.id;
const updated = req.body;
  try {
      const jets = await jet.findByIdAndUpdate(_Id, updated, { new: true });
      if (!jets) {
          return res.status(404).send('Jet not found');
      }
      res.json(jets);
  } catch (err) {
      console.error('Error patching jet:', err);
      res.status(500).send('Internal server error');
  }
};

module.exports = {
  createJet,
  viewJets,
  deleteJet,
  jetViewById,
  countJets,
  updateJet,
};