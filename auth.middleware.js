const jwt = require('jsonwebtoken');
const secret = "Hamza"; 

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      if (err.name === 'JsonWebTokenError') {
        return res.status(403).json({ message: 'Forbidden' });
      } else if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Unauthorized (Token expired)' });
      } else {
        
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyJWT;
