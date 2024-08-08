const cockpit = require('../models/cockpit.model'); 
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const config = require('../firebase.config');
const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);


const createCockpit = async (req, res) => {
  try {
    const dateTime = giveCurrentDateTime();
    const storageRef = ref(storage, `cockpits/${req.file.originalname} ${dateTime}`);
    const metadata = {
      contentType: req.file.mimetype,
    };

    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    const imageURL = await getDownloadURL(snapshot.ref);
    const { name, description} = req.body;
    const newCockpit = new cockpit({
      name,
      description,
      imageURL,
    });
    await newCockpit.save();
    res.json({ message: 'cockpit added successfully' }); 
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

const viewCockpits = async (req, res, next) => {
  try {
    const cockpits = await cockpit.find({ });
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0);
    res.json(cockpits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const cockpitViewById= async (req,res,next)=>{
    cockpit.findOne({_id:req.params.id}).then((cockpits)=>{
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0); 
    return res.json(cockpits);   
     }).catch((error)=>{
     return error;
     })   
};

const countCockpits = async (req, res, next) => {
  try {
    const cockpitCount = await cockpit.countDocuments({});
    const message = "Success";
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0);

    return res.json({"Cockpit Count": cockpitCount, message});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteCockpit = async (req, res, next) => {
  try {
    const cockpitId = req.params.id;

    const deletedCockpit = await cockpit.deleteOne({_id: cockpitId});

    if (deletedCockpit.deletedCount === 0) {
      return res.status(404).json({ message: 'Cockpit not found' });
    }
    res.json({ message: 'Cockpit deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateCockpit = async (req, res) => {
const _Id = req.params.id;
const updated = req.body;
  try {
      const cockpits = await cockpit.findByIdAndUpdate(_Id, updated, { new: true });
      if (!cockpits) {
          return res.status(404).send('Cockpit not found');
      }
      res.json(cockpits);
  } catch (err) {
      console.error('Error patching cockpit:', err);
      res.status(500).send('Internal server error');
  }
};

module.exports = {
  createCockpit,
  viewCockpits,
  deleteCockpit,
  cockpitViewById,
  countCockpits,
  updateCockpit,
};