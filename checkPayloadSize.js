const checkPayloadSize = (req, res, next) => {
    let totalBytes = 0;
  
    req.on('data', chunk => {
      totalBytes += chunk.length;
    });
  
    req.on('end', () => {
      console.log(`Payload size: ${totalBytes} bytes`);
      if (totalBytes > 100 * 1024 * 1024) { // 100MB limit
        return res.status(413).json({ message: 'Payload too large' });
      }
      next();
    });
  
    req.on('error', err => {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    });
  };

  module.exports = checkPayloadSize;
