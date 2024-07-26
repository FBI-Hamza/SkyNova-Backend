const bcrypt = require('bcrypt');
const user = require('../models/user.model');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const multer = require('multer');
const config = require('../firebase.config');
const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);



exports.viewAviators = async (req, res, next) => {
    try {
      const aviator = await user.find({ role: 'Aviator' });

      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      return res.json(aviator);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.viewById= async function(req,res,next){
    user.findOne({_id:req.params.id}).then((aviator)=>{
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      console.log();
      res.json(aviator);   
      }).catch((error)=>{
      return error;
      })   
};


exports.createAviator = async (req, res, next) => {
    try {
      const { firstName,lastName, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const existingUser = await user.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'Email already exists' });
      }

      const newAviator = new user({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: 'Aviator',
      });
  
      const savedUser = await newAviator.save();
  
      res.status(201).json({ message: 'Aviator created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.uploadDP = async (req, res, next) => {
  try {
    const id  = req.body.id; 
    const dateTime = giveCurrentDateTime();
    const storageRef = ref(storage, `files/${req.file.originalname} ${dateTime}`);

    const metadata = {
      contentType: req.file.mimetype,
    };

    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    const downloadUrl = await getDownloadURL(snapshot.ref);

    const userOf = await user.findByIdAndUpdate(id, { profilePicture: downloadUrl }, { new: true });

    if (!userOf) {
      return res.status(404).send('User not found');
    }

    res.status(200).send({ url: downloadUrl });
  } catch (error) {
    console.error('Error handling image upload:', error);
    res.status(500).send('Error handling image upload.');
  }
};

const giveCurrentDateTime = () => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
};



  exports.countAviators = async (req, res, next) => {
    try {
      const aviatorCount = await user.countDocuments({ role: 'Aviator' });
      const message = "Success";
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
  
      return res.json({"aviatorCount": aviatorCount, message});

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  exports.deleteAviator = async (req, res, next) => {
    try {
      const aviatorId = req.params.id;

      const deletedAviator = await user.deleteOne({ _id: aviatorId, role: 'Aviator' });

      if (deletedAviator.deletedCount === 0) {
        return res.status(404).json({ message: 'Aviator not found' });
      }
  
      res.json({ message: 'Aviator deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.updateAviator = async (req, res) => {
    const _Id = req.params.id;
    const updated = req.body;
    const { email } = updated; 

    try {
        if (email) {
            const existingUser = await user.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }

        const aviator = await user.findByIdAndUpdate(_Id, updated, { new: true });

        if (!aviator) {
            return res.status(404).send('Aviator not found');
        }

        res.json(aviator);
    } catch (err) {
        console.error('Error patching aviator:', err);
        res.status(500).send('Internal server error');
    }
};



