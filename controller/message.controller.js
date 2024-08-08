const message = require('../models/message.model');

exports.viewMessage = async (req, res, next) => {
    try {
      const Messages = await message.find({});
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      return res.json(Messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.viewById= async function(req,res,next){
      message.find({_id:req.params.id}).then((messages)=>{
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      res.json(messages);   
      }).catch((error)=>{
      return error;
      })   
};

exports.createMessage = async (req, res, next) => {
    try {
      const {senderID,receiverID,content,type,status} = req.body;

      const newMessage = new message({
        senderID,
        receiverID,
        content,
        type,
        status,
      });
  
      await newMessage.save();
  
      res.status(200).json({ message: 'Message created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


exports.deleteMessage = async (req, res, next) => {
    try {
      const messageId = req.params.id;

      const deletedmessage = await message.deleteOne({ _id: messageId });

      if (deletedmessage.deletedCount === 0) {
        return res.status(404).json({ message: 'Message not found' });
      }
  
      res.json({ message: 'Message deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.updateMessage= async(req, res) => {
    const _Id = req.params.id;
    const updated = req.body;
    try {
      const Messages = await message.findByIdAndUpdate(_Id, {$set:updated},{new:true});

      if (!Messages) {
        return res.status(404).send('Message not found');
      }
      res.json(Messages);
    } catch (err) {
      console.error('Error patching Message:', err);
      res.status(500).send('Internal server error');
    }
  };


