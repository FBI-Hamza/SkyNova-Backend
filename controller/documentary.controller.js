const documentary = require('../models/documentary.model'); 
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const config = require('../firebase.config');
const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);
const warHero = require('../models/warhero.model'); 


const createDocumentary = async (req, res) => {
  try {
    const dateTime = giveCurrentDateTime();
    const storageRef = ref(storage, `Documentary/${req.file.originalname} ${dateTime}`);
    const metadata = {
      contentType: req.file.mimetype,
    };

    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    const documentary = await getDownloadURL(snapshot.ref);
    
    const newdocumentary = new documentary({
      documentary,
    });

    const warHeroes = await warHero.findById(req.body.warHeroId);
        if (!warHeroes) {
            return res.status(404).json({ message: 'War Hero not found' });
        }
        warHeroes.documentary.push(newdocumentary._id);
        await warHeroes.save();

    await newdocumentary.save();
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

const viewDocumentaries = async (req, res, next) => {
  try {
    const documentaries = await documentary.find({ });
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0);
    res.json(documentaries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const documentaryViewById= async (req,res,next)=>{
    documentary.find({_id:req.params.id}).then((documentary)=>{
    return res.json(documentary);   
    }).catch((error)=>{
    return error;
    })   
};

const deleteDocumentary = async (req, res, next) => {
  try {
    const documentaryId = req.params.id;

    const deletedDocumentary = await documentary.deleteOne({_id: documentaryId});

    if (deletedDocumentary.deletedCount === 0) {
      return res.status(404).json({ message: 'Documentary not found' });
    }

    res.json({ message: 'Documentary deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateDocumentary= async(req, res) => {
    const _Id = req.params.id;
    const updated = req.body;
    try {
      const documentaries = await documentary.findByIdAndUpdate(_Id, {$set:updated},{new:true});

      if (!documentaries) {
        return res.status(404).send('War Hero not found');
      }
  
      res.json(documentaries);
    } catch (err) {
      console.error('Error patching Documentary:', err);
      res.status(500).send('Internal server error');
    }
  };

module.exports = {
  createDocumentary,
  viewDocumentaries,
  deleteDocumentary,
  documentaryViewById,
  updateDocumentary
};