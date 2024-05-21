const aviator = require('../models/aviator.model'); 
const bcrypt = require('bcrypt');
const user = require('../models/user.model');

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
    user.find({_id:req.params.id}).then((aviator)=>{
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
      const { userName, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

        const newAviator = new user({
        userName,
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

exports.update= async(req, res) => {
    const _Id = req.params.id;
    const updated = req.body;
  console.log(updated);
    try {
      const aviator = await user.findByIdAndUpdate(_Id, {$set:updated},{new:true});
      console.log(aviator);

      if (!aviator) {
        return res.status(404).send('aviator not found');
      }
  
      res.json(aviator);
    } catch (err) {
      console.error('Error patching aviator:', err);
      res.status(500).send('Internal server error');
    }
  };


