const community = require('../models/community.model');

exports.viewCommunity = async (req, res, next) => {
    try {
      const Communities = await community.find({});
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      return res.json(Communities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.viewById= async function(req,res,next){
      community.find({_id:req.params.id}).then((Communities)=>{
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      res.json(Communities);   
      }).catch((error)=>{
      return error;
      })   
};


exports.createCommunity = async (req, res, next) => {
    try {
      const {question,answer} = req.body;

        const newCommunity = new community({
        answer,
        question,
        });
  
      await newCommunity.save();
  
      res.status(200).json({ message: 'Community created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


  exports.countCommunity = async (req, res, next) => {
    try {
      const communityCount = await result.countDocuments({});
      const message = "Success";
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
  
      return res.json({"Community Count": communityCount, message});

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  exports.deleteCommunity = async (req, res, next) => {
    try {
      const communityId = req.params.id;

      const deletedCommunity = await community.deleteOne({ _id: communityId });

      if (deletedCommunity.deletedCount === 0) {
        return res.status(404).json({ message: 'Community not found' });
      }
  
      res.json({ message: 'Community deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.updateCommunity= async(req, res) => {
    const _Id = req.params.id;
    const updated = req.body;
    try {
      const Communities = await community.findByIdAndUpdate(_Id, {$set:updated},{new:true});

      if (!Communities) {
        return res.status(404).send('Community not found');
      }
      res.json(Communities);
    } catch (err) {
      console.error('Error patching community:', err);
      res.status(500).send('Internal server error');
    }
  };


