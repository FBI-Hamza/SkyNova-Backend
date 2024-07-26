const result = require('../models/result.model');

exports.viewResults = async (req, res, next) => {
    try {
      const results = await result.find({});
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      return res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.viewById= async function(req,res,next){
    result.find({_id:req.params.id}).then((results)=>{
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      res.json(results);   
      }).catch((error)=>{
      return error;
      })   
};


exports.createResult = async (req, res, next) => {
    try {
      const {type,description,marks} = req.body;

        const newResult = new result({
        type,
        description,
        marks,
      });
  
      await newResult.save();
  
      res.status(200).json({ message: 'result created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


  // exports.countResults = async (req, res, next) => {
  //   try {
  //     const resultCount = await result.countDocuments({});
  //     const message = "Success";
  //     res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  //     res.setHeader('Pragma', 'no-cache');
  //     res.setHeader('Expires', 0);
  
  //     return res.json({"resultCount": resultCount, message});

  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Server error' });
  //   }
  // };
  

  exports.deleteResult = async (req, res, next) => {
    try {
      const resultId = req.params.id;

      const deletedResult = await result.deleteOne({ _id: resultId });

      if (deletedResult.deletedCount === 0) {
        return res.status(404).json({ message: 'result not found' });
      }
  
      res.json({ message: 'result deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.updateResult= async(req, res) => {
    const _Id = req.params.id;
    const updated = req.body;
    try {
      const results = await result.findByIdAndUpdate(_Id, {$set:updated},{new:true});

      if (!results) {
        return res.status(404).send('result not found');
      }
  
      res.json(results);
    } catch (err) {
      console.error('Error patching result:', err);
      res.status(500).send('Internal server error');
    }
  };

