
// const multer = require('multer');
// const fs = require('fs');
// const Jet = require('../models/Jets.model'); 
// const { viewById } = require('./aviator.controller');


// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, '/uploads')
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, file.originalname)
// //   }
// // })
// // const upload = multer({ storage: storage })

// const createJet = async (req, res) => {

//   try {
//     console.log('Request File:', req.file); 
//     console.log('Request Body:', req.body); 

//     // if (!req.file) {

//     //   return res.status(400).json({ error: 'Image file is required' });
//     // }

//     const { name, description, url } = req.body;

//     console.log('Name:', name); 
//     console.log('Description:', description); 
//     console.log('URL:', url); 

//     const newJet = new Jet({
//       name,
//       description,
//       url,
//     });

//     await newJet.save();
//     res.status(201);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
//   res.send(req.file);

// };

// const viewJets = async (req, res, next) => {
//   try {
//     const jets = await Jet.find({ });
//     res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
//     res.setHeader('Pragma', 'no-cache');
//     res.setHeader('Expires', 0);
//     res.json(jets);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const jetViewById= async (req,res,next)=>{
//   Jet.find({jetId:req.params.id}).then((jet)=>{
//      res.json(jet);   
//      }).catch((error)=>{
//      return error;
//      })   
// };

// const deleteJet = async (req, res, next) => {
//   try {
//     const jetId = req.params.id;

//     const deletedJet = await user.deleteMany();

//     if (deletedJet.deletedCount === 0) {
//       return res.status(404).json({ message: 'jet not found' });
//     }

//     res.json({ message: 'Jet deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = {
//   createJet,
//   viewJets,
//   deleteJet,
//   jetViewById,
// };



const multer = require('multer');
const fs = require('fs');
const Jet = require('../models/Jets.model'); 
const { viewById } = require('./aviator.controller');


const createJet = async (req, res) => {

  try {
    console.log('Request File:', req.file); 
    console.log('Request Body:', req.body); 

    const { name, description, url } = req.body;

    console.log('Name:', name); 
    console.log('Description:', description); 
    console.log('URL:', url); 

    const newJet = new Jet({
      name,
      description,
      url,
    });

    await newJet.save();
    res.status(201);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  res.send(req.file);

};

const viewJets = async (req, res, next) => {
  try {
    const jets = await Jet.find({ });
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0);
    res.json(jets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const jetViewById= async (req,res,next)=>{
  Jet.find({_id:req.params.id}).then((jet)=>{
     return res.json(jet);   
     }).catch((error)=>{
     return error;
     })   
};

const deleteJet = async (req, res, next) => {
  try {
    const jetId = req.params.id;

    const deletedJet = await Jet.deleteOne({_id: jetId});

    if (deletedJet.deletedCount === 0) {
      return res.status(404).json({ message: 'jet not found' });
    }

    res.json({ message: 'Jet deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createJet,
  viewJets,
  deleteJet,
  jetViewById,
};