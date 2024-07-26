const Terrain = require('../models/terrain.model'); 
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const config = require('../firebase.config');
const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);


const createTerrain = async (req, res) => {
  try {
    const dateTime = giveCurrentDateTime();
    const storageRef = ref(storage, `Terrains/${req.file.originalname} ${dateTime}`);
    const metadata = {
      contentType: req.file.mimetype,
    };

    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    const terrainURL = await getDownloadURL(snapshot.ref);
    
    const { quantity, description} = req.body;
    const newTerrain = new Terrain({
      quantity,
      description,
      terrainURL,
    });

    await newTerrain.save();
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

const viewTerrains = async (req, res, next) => {
  try {
    const Terrains = await Terrain.find({ });
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0);
    res.json(Terrains);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const TerrainViewById= async (req,res,next)=>{
  Terrain.find({_id:req.params.id}).then((Terrain)=>{
     return res.json(Terrain);   
     }).catch((error)=>{
     return error;
     })   
};

const deleteTerrain = async (req, res, next) => {
  try {
    const TerrainId = req.params.id;

    const deletedTerrain = await Terrain.deleteOne({_id: TerrainId});

    if (deletedTerrain.deletedCount === 0) {
      return res.status(404).json({ message: 'Terrain not found' });
    }

    res.json({ message: 'Terrain deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createTerrain,
  viewTerrains,
  deleteTerrain,
  TerrainViewById,
};