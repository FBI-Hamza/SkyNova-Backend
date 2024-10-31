const warHero = require('../models/warHero.model'); 
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const config = require('../firebase.config');
const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);


const createWarHero = async (req, res) => {
  try {
   
    const { name,description} = req.body;
    const newWarHero = new warHero({
      name,
      description,
    });

    await newWarHero.save();
    res.status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const viewWarHeroes = async (req, res, next) => {
  try {
    const warHeroes = await warHero.find({ }).populate('Documentary','FamousQuote');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0);
    res.json(warHeroes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const warHeroViewById= async (req,res,next)=>{
  warHero.find({_id:req.params.id}).populate('Documentary','FamousQuote').then((warHero)=>{
     return res.json(warHero);   
     }).catch((error)=>{
     return error;
     })   
};

const deleteWarHero = async (req, res, next) => {
  try {
    const warHeroId = req.params.id;

    const deletedWarHero = await warHero.deleteOne({_id: warHeroId});

    if (deletedWarHero.deletedCount === 0) {
      return res.status(404).json({ message: 'warHero not found' });
    }

    res.json({ message: 'War Hero deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateWarHero= async(req, res) => {
    const _Id = req.params.id;
    const updated = req.body;
    try {
      const warHeroes = await warHero.findByIdAndUpdate(_Id, {$set:updated},{new:true});

      if (!warHeroes) {
        return res.status(404).send('War Hero not found');
      }
  
      res.json(warHeroes);
    } catch (err) {
      console.error('Error patching report:', err);
      res.status(500).send('Internal server error');
    }
  };

module.exports = {
  createWarHero,
  viewWarHeroes,
  deleteWarHero,
  warHeroViewById,
  updateWarHero
};
