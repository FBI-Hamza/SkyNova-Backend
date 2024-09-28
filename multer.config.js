// const multer = require('multer');

// const storage = multer.memoryStorage();

// const fileFilter = (req, file, cb) => {
//   if (file.originalname.endsWith('.exe')) {
//     return cb(new Error('Executable files (.exe) are not allowed!'), false); 
//   }
//   console.log(file.originalname);

//   cb(null, true);
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 1024 * 1024 * 5 } 
// });

// module.exports = upload;

const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.originalname.endsWith('.exe')) {
    return cb(new Error('Executable files (.exe) are not allowed!')); 
  }
  
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } 
});

module.exports = upload;