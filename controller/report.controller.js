const report = require('../models/report.model');

exports.viewReports = async (req, res, next) => {
    try {
      const reports = await report.find({});
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      return res.json(reports);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.viewById= async function(req,res,next){
    report.find({_id:req.params.id}).then((reports)=>{
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      res.json(reports);   
      }).catch((error)=>{
      return error;
      })   
};


exports.createReport = async (req, res, next) => {
    try {
      const {name,type,description} = req.body;

        const newreport = new report({
        name,
        description,
        type,
      });
  
      await newreport.save();
  
      res.status(200).json({ message: 'report created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


  // exports.countreports = async (req, res, next) => {
  //   try {
  //     const reportCount = await report.countDocuments({});
  //     const message = "Success";
  //     res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  //     res.setHeader('Pragma', 'no-cache');
  //     res.setHeader('Expires', 0);
  
  //     return res.json({"reportCount": reportCount, message});

  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Server error' });
  //   }
  // };
  

  exports.deleteReport = async (req, res, next) => {
    try {
      const reportId = req.params.id;

      const deletedReport = await report.deleteOne({ _id: reportId });

      if (deletedReport.deletedCount === 0) {
        return res.status(404).json({ message: 'report not found' });
      }
  
      res.json({ message: 'report deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.updateReport= async(req, res) => {
    const _Id = req.params.id;
    const updated = req.body;
    try {
      const reports = await report.findByIdAndUpdate(_Id, {$set:updated},{new:true});

      if (!reports) {
        return res.status(404).send('report not found');
      }
  
      res.json(reports);
    } catch (err) {
      console.error('Error patching report:', err);
      res.status(500).send('Internal server error');
    }
  };

