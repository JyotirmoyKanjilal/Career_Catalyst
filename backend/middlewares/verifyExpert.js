const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyExpert = (req, res, next) => {
  const token = req.header('x-expert-token');
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. Expert token required.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isExpert) {
      return res.status(403).json({ error: 'Access denied. Expert privileges required.' });
    }
    req.expert = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid expert token.' });
  }
};

module.exports = verifyExpert;