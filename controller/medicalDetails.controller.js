const medicalDetails = require('../models/medicalDetails.model');

exports.viewMedicalDetails = async (req, res, next) => {
    try {
      const medicalDetailss = await medicalDetails.find({});
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      return res.json(medicalDetailss);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.viewById= async function(req,res,next){
    medicalDetails.find({_id:req.params.id}).then((medicalDetailss)=>{
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      res.json(medicalDetailss);   
      }).catch((error)=>{
      return error;
      })   
};


exports.createMedicalDetails = async (req, res, next) => {
    try {
      const {eyesight,height,weight} = req.body;

        const newMedicalDetails = new medicalDetails({
        eyesight,
        height,
        weight,
      });
  
      await newMedicalDetails.save();
  
      res.status(200).json({ message: 'medicalDetails created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


  // exports.countmedicalDetailss = async (req, res, next) => {
  //   try {
  //     const medicalDetailsCount = await medicalDetails.countDocuments({});
  //     const message = "Success";
  //     res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  //     res.setHeader('Pragma', 'no-cache');
  //     res.setHeader('Expires', 0);
  
  //     return res.json({"medicalDetailsCount": medicalDetailsCount, message});

  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Server error' });
  //   }
  // };
  

  exports.deletemedicalDetails = async (req, res, next) => {
    try {
      const medicalDetailsId = req.params.id;

      const deletedmedicalDetails = await medicalDetails.deleteOne({ _id: medicalDetailsId });

      if (deletedmedicalDetails.deletedCount === 0) {
        return res.status(404).json({ message: 'medicalDetails not found' });
      }
  
      res.json({ message: 'medicalDetails deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.updatemedicalDetails= async(req, res) => {
    const _Id = req.params.id;
    const updated = req.body;
    try {
      const medicalDetailss = await medicalDetails.findByIdAndUpdate(_Id, {$set:updated},{new:true});

      if (!medicalDetailss) {
        return res.status(404).send('medical Details not found');
      }
  
      res.json(medicalDetailss);
    } catch (err) {
      console.error('Error patching medical Details:', err);
      res.status(500).send('Internal server error');
    }
  };
