const mission = require('../models/mission.model'); 
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const config = require('../firebase.config');
const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);


const createMission = async (req, res) => {
  try {
    const dateTime = giveCurrentDateTime();
    const storageRef = ref(storage, `Missions/${req.file.originalname} ${dateTime}`);
    const metadata = {
      contentType: req.file.mimetype,
    };

    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    const imageURL = await getDownloadURL(snapshot.ref);
    const { name, description} = req.body;
    const newmission = new mission({
      name,
      description,
      imageURL,
    });
    await newmission.save();
    res.json({ message: 'Mission added successfully' }); 
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

const viewMissions = async (req, res, next) => {
  try {
    const missions = await mission.find({ });
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0);
    res.json(missions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const missionViewById= async (req,res,next)=>{
    mission.findOne({_id:req.params.id}).then((missions)=>{
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0); 
    return res.json(missions);   
     }).catch((error)=>{
     return error;
     })   
};

const countMissions = async (req, res, next) => {
  try {
    const missionCount = await mission.countDocuments({});
    const message = "Success";
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0);

    return res.json({"mission Count": missionCount, message});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteMission = async (req, res, next) => {
  try {
    const missionId = req.params.id;

    const deletedmission = await mission.deleteOne({_id: missionId});

    if (deletedmission.deletedCount === 0) {
      return res.status(404).json({ message: 'mission not found' });
    }

    res.json({ message: 'mission deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateMission = async (req, res) => {
const _Id = req.params.id;
const updated = req.body;
  try {
      const missions = await mission.findByIdAndUpdate(_Id, updated, { new: true });
      if (!missions) {
          return res.status(404).send('mission not found');
      }
      res.json(missions);
  } catch (err) {
      console.error('Error patching mission:', err);
      res.status(500).send('Internal server error');
  }
};

module.exports = {
  createMission,
  viewMissions,
  deleteMission,
  missionViewById,
  countMissions,
  updateMission,
};