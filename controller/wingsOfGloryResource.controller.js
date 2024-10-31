const WingsOfGloryResource = require('../models/wingsOfGloryResource.model');
const WarHero = require('../models/warHero.model') 
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const config = require('../firebase.config');
const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);

const createWingsOfGloryResource = async (req, res) => {
    try {
        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage, `Wings Of Glory/${req.file.originalname} ${dateTime}`);
        const metadata = {
          contentType: req.file.mimetype,
        };
    
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const imageURL = await getDownloadURL(snapshot.ref);

      const { heroId, name, description, type, content } = req.body;
  
      const newResource = new WingsOfGloryResource({
        name,
        description,
        type,
        content,
        file:imageURL,
      });
  
      await newResource.save();
  
      if (content === 'movie' || content === 'documentary' || content === 'quote') {
        const updateField = 
          content === 'movie' ? { movies: newResource._id } :
          content === 'documentary' ? { documentaries: newResource._id } :
          { quotes: newResource._id };
  
        await WarHero.findByIdAndUpdate(heroId, { $push: updateField });
      }
  
      res.status(201).json({ message: 'Resource created successfully', newResource });
    } catch (error) {
      console.error('Error creating resource:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

const viewWingsOfGloryResource = async (req, res) => {
  try {
    const resources = await WingsOfGloryResource.find({});
    res.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const WingsOfGloryResourceViewById = async (req, res) => {
  try {
    const resource = await WingsOfGloryResource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  } catch (error) {
    console.error('Error fetching resource by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteWingsOfGloryResource = async (req, res) => {
  try {
    const deletedResource = await WingsOfGloryResource.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Error deleting resource:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateWingsOfGloryResource = async (req, res) => {
  try {
    const updatedResource = await WingsOfGloryResource.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json(updatedResource);
  } catch (error) {
    console.error('Error updating resource:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createWingsOfGloryResource,
  viewWingsOfGloryResource,
  WingsOfGloryResourceViewById,
  deleteWingsOfGloryResource,
  updateWingsOfGloryResource,
};