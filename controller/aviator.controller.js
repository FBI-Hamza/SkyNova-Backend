const aviator = require('../models/aviator.model'); 
const bcrypt = require('bcrypt');
const user = require('../models/user.model');

// exports.view= function(req,res,next){
//     User.find().then((aviator)=>{
//      res.json(aviator);   
//     }).catch((error)=>{
//         return err;
//     })
// };

exports.viewAviators = async (req, res, next) => {
    try {
      const aviators = await user.find({ role: 'Aviator' });
      res.json(aviators);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.viewById= async function(req,res,next){
    user.find({aviatorId:req.params.id}).then((aviator)=>{
       res.json(aviator);   
       }).catch((error)=>{
       return error;
       })   
};

// exports.create=function(req,res,next){
//     aviator.create(req.body).then((result)=>{
//         res.json(result);
//     }).catch((err)=>{
//         res.json(err);
//     })};

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
      res.json({ count: aviatorCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

exports.delete= function(req,res,next){
    user.deleteOne({aviatorId:req.params.id}).then((result)=>{
        res.json(result);
    }).catch((err)=>{
        res.json(err);
    })
};

// exports.update= async function(req, res, next){
//     try {
//       const aviatorId = req.params.id;
//       const updateData = req.body;
//       const aviator = await aviator.findByIdAndUpdate({aviatorId:req.params.id}, updateData, { new: true });
//       if (!aviator) {
//         return res.status(404).json({ message: "aviator not found" });
//       }
//       res.json(aviator);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Error updating aviator" });
//     }
//   };

// exports.update= async function(req, res, next){
//     await aviator.findByIdAndUpdate({aviatorId:req.params.id}, req.body,{ completed: true });
//     res.json({status:"success"})
//       };

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

// exports.update= async function(req, res, next){
//       const aviatorId = req.params.id*1;
//       const updateData = req.body;
//       const parsedId =parseInt(aviatorId);
//       if(isNaN(parsedId)) return res.status(400);

//       aviator[parsedId] = {...aviator[parsedId],...updateData};
//       return res.status(200);
//   };
