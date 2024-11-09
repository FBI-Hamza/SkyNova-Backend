const WarHero = require('../models/warHero.model'); 
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const { firebaseConfig } = require('../firebase.config');
const base64ToBlob = require('../base64toblob');

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const createWarHero = async (req, res) => {
  try {
    console.log(req.body);
    let imageURL = null;
    if (req.body.image) {
      const blob = base64ToBlob(req.body.image, 'image/png');
      const storageRef = ref(storage, `War Heroes/$${Date.now()}-${blob.originalname}`);
      const snapshot = await uploadBytesResumable(storageRef, blob);
      imageURL = await getDownloadURL(snapshot.ref);
    }

    const { name, description, accomplishments, medals, movies, documentaries, quotes } = req.body;
    const newWarHero = new WarHero({
      name,
      description,
      image:imageURL,
      accomplishments,
      medals,
    });

    await newWarHero.save();
    res.status(200).json({ message: 'War Hero created successfully' });
  } catch (error) {
    console.error('Error creating War Hero:', error);
    res.status(400).json({ error: error.message });
  }
};

const viewWarHeroes = async (req, res, next) => {
  try {
    const warHeroes = await WarHero.find({})
    .populate('movies')
    .populate('documentaries')
    .populate('quotes'); 

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0);
    res.json(warHeroes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const warHeroViewById = async (req, res, next) => {
  try {
    const warHero = await WarHero.findById(req.params.id)
    .populate('movies')
    .populate('documentaries')
    .populate('quotes'); 
    if (!warHero) {
      return res.status(404).json({ message: 'War Hero not found' });
    }

    res.json(warHero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteWarHero = async (req, res, next) => {
  try {
    const warHeroId = req.params.id;

    const deletedWarHero = await WarHero.findByIdAndDelete({ _id: warHeroId });

    if (deletedWarHero.deletedCount === 0) {
      return res.status(404).json({ message: 'War Hero not found' });
    }

    res.json({ message: 'War Hero deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateWarHero = async (req, res) => {
  const _Id = req.params.id;
  const updated = req.body;
  try {
    const warHero = await findByIdAndUpdate(_Id, { $set: updated }, { new: true })
      .populate('movies documentaries quotes', 'name'); 

    if (!warHero) {
      return res.status(404).send('War Hero not found');
    }

    res.json(warHero);
  } catch (err) {
    console.error('Error updating War Hero:', err);
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  createWarHero,
  viewWarHeroes,
  deleteWarHero,
  warHeroViewById,
  updateWarHero,
};
