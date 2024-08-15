const resource = require('../models/resource.model'); 
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const config = require('../firebase.config');
const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);

const createResource = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);

    const dateTime = giveCurrentDateTime();
    const storageRef = ref(storage, `resources/${req.file.originalname} ${dateTime}`);
    const metadata = {
      contentType: req.file.mimetype,
    };

    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    const content = await getDownloadURL(snapshot.ref);
    
    const { title, type, description, contentURL } = req.body;
    const newResource = new resource({
      title,
      type,
      description,
      contentURL,
      content
    });

    await newResource.save();
    return res.status(200).json({ message: 'Resource created successfully', resource: newResource });
  } catch (error) {
    console.error('Error creating resource:', error);
    res.status(400).json({ error: error.message });
  }
};


const giveCurrentDateTime = () => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
};

const viewResources = async (req, res, next) => {
  try {
    const resources = await resource.find({ });
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0);
    res.json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const resourceViewById= async (req,res,next)=>{
     resource.find({_id:req.params.id}).then((resource)=>{
     return res.json(resource);   
     }).catch((error)=>{
     return error;
     })   
};

const countResources = async (req, res, next) => {
  try {
    const resourceCount = await resource.countDocuments({});
    const message = "Success";
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0);

    return res.json({"Resource Count": resourceCount, message});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteResource = async (req, res, next) => {
  try {
    const resourceId = req.params.id;

    const deletedResource = await resource.deleteOne({_id: resourceId});

    if (deletedResource.deletedCount === 0) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateResource= async(req, res) => {
    const _Id = req.params.id;
    const updated = req.body;
    try {
      const resources = await resource.findByIdAndUpdate(_Id, {$set:updated},{new:true});

      if (!resources) {
        return res.status(404).send('Resource not found');
      }
  
      res.json(resources);
    } catch (err) {
      console.error('Error patching report:', err);
      res.status(500).send('Internal server error');
    }
  };

module.exports = {
  createResource,
  viewResources,
  deleteResource,
  resourceViewById,
  updateResource,
  countResources,
};