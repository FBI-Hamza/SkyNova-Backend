const complaint = require('../models/complaint.model');

exports.viewComplaints = async (req, res, next) => {
    try {
      const complaints = await complaint.find({});
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      return res.json(complaints);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.viewById= async function(req,res,next){
      complaint.find({_id:req.params.id}).then((complaints)=>{
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      res.json(complaints);   
      }).catch((error)=>{
      return error;
      })   
};


exports.createComplaint = async (req, res, next) => {
    try {
      const {title,description} = req.body;

        const newComplaint = new complaint({
        title,
        description,
        });
  
      await newComplaint.save();
  
      res.status(200).json({ message: 'Complaint created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


  exports.countComplaints = async (req, res, next) => {
    try {
      const complaintCount = await complaint.countDocuments({});
      const message = "Success";
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
  
      return res.json({"Complaint Count": complaintCount, message});

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  exports.deleteComplaint = async (req, res, next) => {
    try {
      const complaintId = req.params.id;

      const deletedcomplaint = await complaint.deleteOne({ _id: complaintId });

      if (deletedcomplaint.deletedCount === 0) {
        return res.status(404).json({ message: 'Complaint not found' });
      }
  
      res.json({ message: 'Complaint deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// exports.updateComplaint= async(req, res) => {
//     const _Id = req.params.id;
//     const updated = req.body;
//     try {
//       const complaints = await complaint.findByIdAndUpdate(_Id, {$set:updated},{new:true});

//       if (!complaints) {
//         return res.status(404).send('complaint not found');
//       }
  
//       res.json(complaints);
//     } catch (err) {
//       console.error('Error patching complaint:', err);
//       res.status(500).send('Internal server error');
//     }
//   };

