const notification = require('../models/notification.model');

exports.viewNotifications = async (req, res, next) => {
    try {
      const notifications = await notification.find({});
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      return res.json(notifications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.viewById= async function(req,res,next){
    notification.find({_id:req.params.id}).then((notifications)=>{
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      res.json(notifications);   
      }).catch((error)=>{
      return error;
      })   
};


exports.createNotification = async (req, res, next) => {
    try {
      const {title,description} = req.body;

        const newNotification = new notification({
        title,
        description,
    });
  
      await newNotification.save();
  
      res.status(200).json({ message: 'Notification created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


  // exports.countnotifications = async (req, res, next) => {
  //   try {
  //     const notificationCount = await notification.countDocuments({});
  //     const message = "Success";
  //     res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  //     res.setHeader('Pragma', 'no-cache');
  //     res.setHeader('Expires', 0);
  
  //     return res.json({"notificationCount": notificationCount, message});

  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Server error' });
  //   }
  // };
  

  exports.deleteNotification = async (req, res, next) => {
    try {
      const notificationId = req.params.id;

      const deletedNotification = await notification.deleteOne({ _id: notificationId });

      if (deletedNotification.deletedCount === 0) {
        return res.status(404).json({ message: 'Notification not found' });
      }
  
      res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.updateNotification= async(req, res) => {
    const _Id = req.params.id;
    const updated = req.body;
    try {
      const notifications = await notification.findByIdAndUpdate(_Id, {$set:updated},{new:true});

      if (!notifications) {
        return res.status(404).send('Notification not found');
      }
  
      res.json(notifications);
    } catch (err) {
      console.error('Error patching notification:', err);
      res.status(500).send('Internal server error');
    }
  };

