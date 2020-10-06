const jwt = require('jsonwebtoken');

function AuthMiddleware(req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).json({ error: 'No Authorization header' });
  }

  const token = req.header('Authorization').replace('Bearer ', '');

  let data = { };

  try {
    data = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return res.status(403).send({ error: 'Invalid token' });
  }

  try {
    req.user = data;

    next();
  } catch (error) {
    res.status(403).json({ error: 'Not authorized to access this resource' });
  }
}

module.exports = AuthMiddleware;
