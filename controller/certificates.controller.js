const certificate = require('../models/certificate.model');

exports.viewCertificates = async (req, res, next) => {
    try {
      const Certificates = await certificate.find({});
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      return res.json(Certificates);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.viewById= async function(req,res,next){
      certificate.findOne({_id:req.params.id}).then((Certificates)=>{
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      res.json(Certificates);   
      }).catch((error)=>{
      return error;
      })   
};


exports.createCertificate = async (req, res, next) => {
    try {
      const {type,description} = req.body;

        const newCertificate = new certificate({
        type,
        description,
        });
  
      await newCertificate.save();
  
      res.status(200).json({ message: 'Certificate created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


  exports.countCertificates = async (req, res, next) => {
    try {
      const certificateCount = await certificate.countDocuments({});
      const message = "Success";
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
  
      return res.json({"certificateCount": certificateCount, message});

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  exports.deleteCertificate = async (req, res, next) => {
    try {
      const certificateId = req.params.id;

      const deletedCertificate = await certificate.deleteOne({ _id: certificateId });

      if (deletedCertificate.deletedCount === 0) {
        return res.status(404).json({ message: 'Certificate not found' });
      }
  
      res.json({ message: 'Certificate deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.updateCertificate= async(req, res) => {
    const _Id = req.params.id;
    const updated = req.body;
    try {
      const Certificates = await certificate.findByIdAndUpdate(_Id, {$set:updated},{new:true});

      if (!Certificates) {
        return res.status(404).send('Certificate not found');
      }
      res.json(Certificates);
    } catch (err) {
      console.error('Error patching certificate:', err);
      res.status(500).send('Internal server error');
    }
  };


